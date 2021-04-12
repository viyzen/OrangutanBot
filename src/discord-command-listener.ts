import { Message } from "discord.js";

import { AbstractCommandResult } from "./command-parser/abstracts/abstract-command";
import { MainParser } from "./command-parser/main-parser";
import { ParsedInput } from "./command-parser/parsed-input";
import { DiscordAPI } from "./discord-api";

export class CommandListener {
  constructor(private readonly discordAPI: DiscordAPI) {}

  public start() {
    this.discordAPI.discordClient.on("message", this._executeCommand);
  }
  private _executeCommand = async (message: Message) => {
    if (
      message.author.bot ||
      message.attachments?.size ||
      !message.content ||
      message.channel.type !== "text"
    ) {
      //cancel if bot, has attachments, has no content, or is not in a text channel
      return;
    }
    const parsedInput = ParsedInput.createNew(message);

    const result: AbstractCommandResult = await new MainParser().parse(
      parsedInput,
    );
    if (result) {
      this.discordAPI.postInChannel(message.channel.id, result.messages);
    }
  };
}
