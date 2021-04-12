import { Message } from "discord.js";

import { db } from "../../../../database/player-stats-repository";
import { AbstractCommandResult } from "../../../abstracts/abstract-command";
import { OptionsParser } from "../../../options-parser";
import { ParsedInput } from "../../../parsed-input";
import { dice } from "./dice";

export class DiceParser {
  public async parseCommand(
    args: string,
    message: Message,
  ): Promise<AbstractCommandResult> {
    const options = OptionsParser.getOptions(args);

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case "--help":
          return { messages: [dice.help] };
      }
    }

    const rollCount = parseInt(ParsedInput.getCurrentWord(args));

    if (isNaN(rollCount) || rollCount > 100 || rollCount < 1) {
      return { messages: [dice.help] };
    }

    const result = dice.execute({ rollCount });

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
    playerStats.dicerolls += rollCount;

    await (await db).updatePlayerStatsForUserId(playerStats);
    console.log("updated playerstats for user: " + message.author.username);

    return {
      messages: [
        "In " +
          result.rollCount +
          " rolls you rolled a total of: " +
          result.rollTotal +
          "\nAverage roll: " +
          result.rollAvg,
      ],
    };
  }
}
