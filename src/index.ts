import { DiscordAPI } from "./discord-api";
import { CommandListener } from "./discord-command-listener";
//entry point
async function start() {
  //new instance of DiscordAPI, methods for login, msg sending, etc.
  const discordAPI = new DiscordAPI();
  try {
    //bot login
    await discordAPI.login();
  } catch (error) {
    console.error(error);
    process.exit();
  }
  //start event listener for commands
  const commandListener = new CommandListener(discordAPI);
  commandListener.start();
}

//begin
start();
