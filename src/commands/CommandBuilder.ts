import { Message } from "discord.js";

import { DiscordAPI } from "../discord-api";
import dice from "./dice";
import rps from "./rps";

export class CommandBuilder {
  constructor(private readonly discordAPI: DiscordAPI) {
    discordAPI.discordClient.on("message", this._executeCommand);
    //on message _executeCommand with message data
  }
  private _executeCommand = async (message: Message) => {
    if (message.author.bot) {
      //cancel if bot
      return;
    }
    const args = message.content
      .trim() //remove starting + ending spaces and \n
      .replace(/\s+/g, " ") //remove duplicate spaces and replace with single spaces
      .toLowerCase() //lowercase
      .split(" "); //string -> array split on space
    //"incoming  test    message"
    //"incoming","test","message"
    const command = args.shift();
    //command = "incoming";args = "test","message"
    if (!command) {
      //if empty msg
      return;
    }
    let toSend;
    switch (command) {
      case "rps":
        toSend = await rps(args, message.author.id);
        break;
      case "dice":
        toSend = await dice(args, message.author.id);
      default:
        break;
    }
    if (toSend) {
      this.discordAPI.postInChannel(message.channel.id, toSend);
    }
  };
}
