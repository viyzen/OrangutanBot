import { Message } from "discord.js";

import { db } from "../../../../database/player-stats-repository";
import { AbstractCommandResult } from "../../../abstracts/abstract-command";
import { OptionsParser } from "../../../options-parser";
import { ParsedInput } from "../../../parsed-input";
import { rps } from "./rps";
import { Choices, MultipleResults } from "./rps-types";

export class RpsParser {
  public async parseCommand(
    args: string,
    message: Message,
  ): Promise<AbstractCommandResult> {
    const options = OptionsParser.getOptions(args);

    let numberOfRepeats = 1;

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case "--help":
          return { messages: [rps.help] };
        case "--repeat":
          const repeatTime = parseInt(value, 10);
          if (isNaN(repeatTime) || repeatTime > 10 || repeatTime <= 0) {
            return { messages: [rps.help] };
          }
          numberOfRepeats = repeatTime;
      }
    }
    const playerChoice: Choices = <any>(
      ParsedInput.getCurrentWord(args)?.toUpperCase()
    );
    if (!Object.values(Choices).includes(playerChoice)) {
      return { messages: [rps.help] };
    }

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
