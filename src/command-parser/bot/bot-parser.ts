import { AbstractCommandResult } from "../abstracts/abstract-command";
import { ParsedInput } from "../parsed-input";
import { DddParser } from "./ddd/ddd-parser";
import { PlayParser } from "./play/play-parser";

//"bot --help --do something --else"

export class BotParser {
  public async parse(parsedInput: ParsedInput): Promise<AbstractCommandResult> {
    switch (parsedInput.current) {
      case "play":
        return await new PlayParser().parse(parsedInput.parse());
      case "ddd":
        return await new DddParser().parseCommand(parsedInput.remaining);
      default:
        return null;
    }
  }
}
