import { CommandBuilder } from "./commands/CommandBuilder";
import { DiscordAPI } from "./discord-api";

async function start() {
  const discordAPI = new DiscordAPI();
  try {
    await discordAPI.login();
  } catch (error) {
    console.error(error);
    process.exit();
  }
  const commandBuilder = new CommandBuilder(discordAPI);
}

start();
