import { DiscordCommandResult } from "../discordCommandResult";
import { BotParser } from "./bot/botParser";
import { ParsedInput } from "./ParsedInput";

export class MainParser {
  public async parse(parsedInput: ParsedInput): Promise<DiscordCommandResult> {
    switch (parsedInput.current) {
      case "bot":
        return await new BotParser().parse(parsedInput.parse());
      default:
        return null;
    }
  }
}
