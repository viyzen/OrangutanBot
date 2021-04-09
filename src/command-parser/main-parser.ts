import { AbstractCommandResult } from "./abstracts/abstract-command";
import { BotParser } from "./bot/bot-parser";
import { ParsedInput } from "./parsed-input";

export class MainParser {
  public async parse(parsedInput: ParsedInput): Promise<AbstractCommandResult> {
    switch (parsedInput.current) {
      case "bot":
        return await new BotParser().parse(parsedInput.parse());
      default:
        return null;
    }
  }
}
