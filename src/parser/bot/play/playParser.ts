import { DiscordCommandResult } from "../../../discordCommandResult";
import { ParsedInput } from "../../ParsedInput";
import { DiceParser } from "./dice/diceParser";
import { RpsParser } from "./rps/rpsParser";

export class PlayParser {
  public async parse(parsedInput: ParsedInput): Promise<DiscordCommandResult> {
    switch (parsedInput.current) {
      case "rps":
        return await new RpsParser().parseCommand(
          parsedInput.remaining,
          parsedInput.discordMessage.author.id,
        );
      case "dice":
        return new DiceParser().parseCommand(parsedInput.remaining);
      default:
        return null;
    }
  }
}
