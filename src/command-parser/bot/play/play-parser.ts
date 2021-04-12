import { AbstractCommandResult } from "../../abstracts/abstract-command";
import { ParsedInput } from "../../parsed-input";
import { DiceParser } from "./dice/dice-parser";
import { RpsParser } from "./rps/rps-parser";
import { TicTacToeParser } from "./tictactoe/tictactoe-parser";

export class PlayParser {
  public async parse(parsedInput: ParsedInput): Promise<AbstractCommandResult> {
    switch (parsedInput.current) {
      case "rps":
        return await new RpsParser().parseCommand(
          parsedInput.remaining,
          parsedInput.discordMessage,
        );
      case "dice":
        return new DiceParser().parseCommand(
          parsedInput.remaining,
          parsedInput.discordMessage,
        );
      case "tictactoe":
        return new TicTacToeParser().parseCommand(parsedInput.remaining);
      default:
        return null;
    }
  }
}
