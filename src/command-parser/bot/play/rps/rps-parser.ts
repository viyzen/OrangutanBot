import { Message } from "discord.js";

import { commandStateStore } from "../../../../command-state/command-state-store";
import { db } from "../../../../database/player-stats-repository";
import {
  AbstractCommandResult,
  AbstractCommandState,
} from "../../../abstracts/abstract-command";
import { ICommandParser } from "../../../abstracts/abstract-parser";
import { OptionsParser } from "../../../options-parser";
import { ParsedInput } from "../../../parsed-input";
import { rps } from "./rps";
import { Choices, MultipleResults } from "./rps-types";

export class RpsParser implements ICommandParser {
  public async parseCommand(
    args: string,
    message: Message,
    commandState?: AbstractCommandState,
  ): Promise<AbstractCommandResult> {
    const options = OptionsParser.getOptions(args);

    let numberOfRepeats = 1;
    let playerChoice: Choices = <any>(
      ParsedInput.getCurrentWord(args)?.toUpperCase()
    );

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case "--help":
          commandStateStore.delete(message.author.id);
          return { messages: [rps.help] };
        case "--repeat":
          numberOfRepeats = parseInt(value, 10);
          if (
            isNaN(numberOfRepeats) ||
            numberOfRepeats > 10 ||
            numberOfRepeats < 1
          ) {
            return { messages: [rps.help] };
          }
        case "--random":
          playerChoice = Object.values(Choices)[Math.floor(Math.random() * 3)];
      }
    }

    if (!Object.values(Choices).includes(playerChoice)) {
      if (commandState && commandState.question === "item") {
        if (ParsedInput.getCurrentWord(args)?.toUpperCase() === "C") {
          commandStateStore.delete(message.author.id);
          return null;
        }
        const newCommandState: AbstractCommandState = {
          author: message.author.id,
          channel: message.channel.id,
          command: this,
          question: "item",
        };
        commandStateStore.set(message.author.id, newCommandState);
        return { messages: [rps.help, "Select an item:\n\n[c] cancel"] };
      }
      if (args === null) {
        const newCommandState: AbstractCommandState = {
          author: message.author.id,
          channel: message.channel.id,
          command: this,
          question: "item",
        };
        commandStateStore.set(message.author.id, newCommandState);
        return { messages: ["Select an item:\n\n[c] cancel"] };
      }
      return { messages: [rps.help] };
    }

    commandStateStore.delete(message.author.id);

    const results: MultipleResults = {
      playerWins: 0,
      botWins: 0,
      draws: 0,
      botLastChoice: null,
    };

    for (let i = 0; i < numberOfRepeats; i++) {
      const result = rps.execute({ playerChoice });
      results.playerWins += result.playerWin === "WIN" ? 1 : 0;
      results.botWins += result.playerWin === "LOSS" ? 1 : 0;
      results.draws += result.playerWin === "DRAW" ? 1 : 0;
      results.botLastChoice = result.botChoice;
    }

    let playerStats = await (await db).findPlayerStatsByUserId(
      message.author.id,
    );

    if (playerStats === null) {
      (await db).createNewPlayerStatsForUserId(message.author.id);
      console.log(
        "created new playerstats for user: " + message.author.username,
      );
      playerStats = await (await db).findPlayerStatsByUserId(message.author.id);
    }
    playerStats.rpsplays += numberOfRepeats;
    playerStats.rpsdraws += results.draws;
    playerStats.rpswins += results.playerWins;
    playerStats.rpslosses += results.botWins;

    await (await db).updatePlayerStatsForUserId(playerStats);
    console.log("updated playerstats for user: " + message.author.username);

    if (numberOfRepeats === 1) {
      const winLossDrawReply = results.playerWins
        ? "i lost"
        : results.botWins
        ? "i win"
        : "its a draw";
      return {
        messages: [
          "i picked " +
            results.botLastChoice.toLowerCase() +
            ". " +
            winLossDrawReply,
        ],
      };
    } else {
      return {
        messages: [
          "results after " +
            numberOfRepeats +
            " games \n" +
            "my wins: " +
            results.botWins +
            "\nyour wins: " +
            results.playerWins +
            "\ndraws: " +
            results.draws,
        ],
      };
    }
  }
}
