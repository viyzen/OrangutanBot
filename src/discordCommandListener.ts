import { Message } from "discord.js";

import { DiscordAPI } from "./discord-api";
import { DiscordCommandResult } from "./discordCommandResult";
import { MainParser } from "./parser/mainParser";
import { ParsedInput } from "./parser/ParsedInput";

export class CommandListener {
  constructor(private readonly discordAPI: DiscordAPI) {}

  public start() {
    this.discordAPI.discordClient.on("message", this._executeCommand);
    //on message _executeCommand with message data
  }
  private _executeCommand = async (message: Message) => {
    if (
      message.author.bot ||
      message.attachments?.size ||
      !message.content ||
      message.channel.type !== "text"
    ) {
      //cancel if bot, has attachments, has no content, or is not a text channel
      return;
    }
    const parsedInput = ParsedInput.createNew(message);

    const result: DiscordCommandResult = await new MainParser().parse(
      parsedInput,
    );
    if (result) {
      this.discordAPI.postInChannel(message.channel.id, result.messages);
    }
  };
}
