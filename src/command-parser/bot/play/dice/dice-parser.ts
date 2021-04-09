import { AbstractCommandResult } from "../../../abstracts/abstract-command";
import { OptionsParser } from "../../../options-parser";
import { ParsedInput } from "../../../parsed-input";
import { dice } from "./dice";

export class DiceParser {
  public async parseCommand(args: string): Promise<AbstractCommandResult> {
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

    console.log(result);

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
