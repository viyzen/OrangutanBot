import { Message } from "discord.js";

export class ParsedInput {
  public fullMessage: string;
  public current: string;
  public remaining: string;
  public parsed: Array<string>;
  public discordMessage: Message;

  private constructor(
    fullMessage: string,
    current: string,
    remaining: string,
    parsed: Array<string>,
    discordMessage: Message,
  ) {
    this.fullMessage = fullMessage;
    this.current = current;
    this.remaining = remaining;
    this.parsed = parsed;
    this.discordMessage = discordMessage;
  }

  public static createNew(discordMessage: Message): ParsedInput {
    return new ParsedInput(
      discordMessage.content,
      ParsedInput.getCurrentWord(discordMessage.content),
      ParsedInput.getAllButCurrent(discordMessage.content),
      [],
      discordMessage,
    );
  }

  public parse(): ParsedInput {
    return new ParsedInput(
      this.fullMessage,
      ParsedInput.getCurrentWord(this.remaining),
      ParsedInput.getAllButCurrent(this.remaining),
      this.parsed.concat(this.current),
      this.discordMessage,
    );
  }

  public static getCurrentWord(string: string): string {
    if (!string) {
      return null;
    }
    return string.split(" ")[0];
  }

  public static getAllButCurrent(string: string): string {
    if (!string?.includes(" ")) {
      return null;
    }
    return string.substr(string.indexOf(" ")).trim();
  }
}
