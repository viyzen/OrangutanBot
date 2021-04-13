import { Message } from "discord.js";

import {
  AbstractCommandResult,
  AbstractCommandState,
} from "./command-parser/abstracts/abstract-command";
import { MainParser } from "./command-parser/main-parser";
import { ParsedInput } from "./command-parser/parsed-input";
import { commandStateStore } from "./command-state/command-state-store";
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

    let result: AbstractCommandResult;

    const commandState: AbstractCommandState = commandStateStore.get(
      message.author.id,
    );
    if (commandState !== undefined) {
      if (commandState.channel === message.channel.id) {
        result = await commandState.command.parseCommand(
          message.content,
          message,
          commandState,
        );

        if (result) {
          this.discordAPI.postInChannel(message.channel.id, result.messages);
        }
        return;
      }
    }

    result = await new MainParser().parse(parsedInput);
    if (result) {
      this.discordAPI.postInChannel(message.channel.id, result.messages);
    }
  };
}
