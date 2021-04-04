import { DiscordCommandResult } from "../../discordCommandResult";
import { ParsedInput } from "../ParsedInput";
import { PlayParser } from "./play/playParser";

//"bot --help --do something --else"

export class BotParser {
  public async parse(parsedInput: ParsedInput): Promise<DiscordCommandResult> {
    switch (parsedInput.current) {
      case "play":
        return await new PlayParser().parse(parsedInput.parse());
      default:
        return null;
    }
  }
}
