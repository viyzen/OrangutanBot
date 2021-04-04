import {
  Channel,
  Client,
  Message,
  MessageEmbed,
  Snowflake,
  TextChannel,
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export class DiscordAPI {
  public readonly discordClient = new Client();

  private _isLoggedOn: boolean;

  public login(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._isLoggedOn) {
        return reject();
      }

      this.discordClient.on("error", (error: Error) => {
        console.error("[DISCORD] Caught in Discord: ", error);
        return reject();
      });

      this.discordClient.on("ready", async () => {
        this._isLoggedOn = true;
        await this.refreshCache();
        console.log("[Discord] Connected to Discord");
        return resolve();
      });

      this.discordClient.login(process.env["TOKEN"]);
    });
  }

  public async getChannelById(id: string): Promise<Channel> {
    let channel: Channel = this.discordClient.channels.cache.get(id);
    if (!channel) {
      channel = await this.discordClient.channels.fetch(id, true);
    }
    return channel;
  }

  private async refreshCache(): Promise<void> {
    await (
      await this.discordClient.guilds.fetch("402355423287574529", true)
    ).members.fetch();
  }

  public async postInChannel(
    channelId: Snowflake,
    messages: Array<string | MessageEmbed>,
  ): Promise<Array<Message>> {
    if (!messages?.length) {
      return [];
    }
    const channel: Channel = await this.getChannelById(channelId);
    const separatedMessages: Array<
      Array<string> | MessageEmbed
    > = DiscordAPI.separateEmbedFromTextMessages(messages);
    let messagesSent: Array<Message> = [];
    for (let i = 0; i < separatedMessages.length; i++) {
      const message = separatedMessages[i];
      if (message instanceof MessageEmbed) {
        messagesSent.push(await (<TextChannel>channel).send(message));
      } else {
        messagesSent = messagesSent.concat(
          await this.postInChannelWithArrayString(channel, message),
        );
      }
    }
    return messagesSent;
  }

  private static separateEmbedFromTextMessages(
    messages: Array<string | MessageEmbed>,
  ): Array<Array<string> | MessageEmbed> {
    const returnValue: Array<Array<string> | MessageEmbed> = [];
    let currentStringStore: Array<string> = [];
    for (let i = 0; i < messages.length; i++) {
      if (messages[i] instanceof MessageEmbed) {
        if (currentStringStore.length) {
          returnValue.push(currentStringStore);
          currentStringStore = [];
        }
        returnValue.push(<MessageEmbed>messages[i]);
      } else {
        currentStringStore.push(<string>messages[i]);
      }
    }
    if (currentStringStore.length) {
      returnValue.push(currentStringStore);
    }
    return returnValue;
  }

  private async postInChannelWithArrayString(
    channel: Channel,
    messages: Array<string>,
  ): Promise<Array<Message>> {
    const listOfMessages: Array<
      Array<string>
    > = DiscordAPI.splitMessagesIfNeeded(messages);
    const messagesSent: Array<Message> = [];
    for (let i = 0; i < listOfMessages.length; i++) {
      messagesSent.push(await (<TextChannel>channel).send(listOfMessages[i]));
    }
    return messagesSent;
  }

  private static splitMessagesIfNeeded(
    messages: Array<string>,
  ): Array<Array<string>> {
    let length = 0;
    const returnArray: Array<Array<string>> = [];
    let tempArrayMessage: Array<string> = [];
    let isIgnoringFormating = false;
    for (const currentMessage of messages) {
      if (!currentMessage) {
        continue;
      }
      length += currentMessage.length;
      if (length <= 1900) {
        // to allow formatting prevention if needed and in case
        tempArrayMessage.push(currentMessage);
      } else {
        if (isIgnoringFormating) {
          tempArrayMessage[tempArrayMessage.length - 1] =
            tempArrayMessage[tempArrayMessage.length - 1] + "```";
        }
        length = currentMessage.length;
        returnArray.push([...tempArrayMessage]);
        tempArrayMessage = isIgnoringFormating
          ? ["```" + currentMessage]
          : [currentMessage];
      }
      if (currentMessage.includes("```")) {
        isIgnoringFormating = !isIgnoringFormating;
      }
    }
    returnArray.push(tempArrayMessage);
    return returnArray;
  }
}
