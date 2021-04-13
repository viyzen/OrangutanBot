import { Message } from "discord.js";

import { db } from "../../../../database/player-stats-repository";
import { AbstractCommandResult } from "../../../abstracts/abstract-command";
import { ICommandParser } from "../../../abstracts/abstract-parser";
import { OptionsParser } from "../../../options-parser";
import { ParsedInput } from "../../../parsed-input";
import { dice } from "./dice";

export class DiceParser implements ICommandParser {
  public async parseCommand(
    args: string,
    message: Message,
  ): Promise<AbstractCommandResult> {
    const options = OptionsParser.getOptions(args);

    let diceSides = 6;

    let rollCount = parseInt(ParsedInput.getCurrentWord(args));

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case "--help":
          return { messages: [dice.help] };
        case "--dice":
        case "--d":
          diceSides = parseInt(value);
          if (isNaN(diceSides) || diceSides > 100 || diceSides < 2) {
            return { messages: [dice.help] };
          }
        case "--r":
        case "--random":
          rollCount = Math.floor(Math.random() * 100) + 1;
      }
    }

    if (isNaN(rollCount) || rollCount > 100 || rollCount < 1) {
      return { messages: [dice.help] };
    }

    const result = dice.execute({ rollCount, diceSides });

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
