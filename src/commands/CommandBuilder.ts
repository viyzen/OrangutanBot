import { Message } from "discord.js";

import { DiscordAPI } from "../discord-api";
import rps from "./rps";

export class CommandBuilder {
  constructor(private readonly discordAPI: DiscordAPI) {
    discordAPI.discordClient.on("message", this._executeCommand);
  }
  private _executeCommand = async (message: Message) => {
    if (message.author.bot) {
      return;
    }
    const args = message.content
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .split(" ");
    const command = args.shift();
    if (!command) {
      return;
    }
    let toSend;
    switch (command) {
      case "rps":
        toSend = await rps(args, message.author.id);
        break;
      default:
        break;
    }
    if (toSend) {
      this.discordAPI.postInChannel(message.channel.id, toSend);
    }
  };
}
