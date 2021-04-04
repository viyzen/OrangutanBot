import { DiscordAPI } from "./discord-api";
import { CommandListener } from "./discordCommandListener";

async function start() {
  const discordAPI = new DiscordAPI();
  try {
    await discordAPI.login();
  } catch (error) {
    console.error(error);
    process.exit();
  }
  const commandListener = new CommandListener(discordAPI);
  commandListener.start();
}

start();
