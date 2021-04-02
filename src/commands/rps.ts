import { db } from "../Database";
import { rl } from "../RateLimiter";

export default async function (
  args: string[],
  playerID: string,
): Promise<string[]> {
  if (rl.isRateLimited(playerID, "rps", 1000)) {
    //1000 ms ratelimit
    return;
  }
  const choices = ["rock", "paper", "scissors"];
  const player = args[0]; //player choice
  if (!choices.includes(player)) {
    //verify player made a valid choice
    //else return command usage
    return ["Usage: `rps rock/paper/scissors`"];
  }
  const bot = choices[Math.floor(Math.random() * 3)]; //random select 0, 1, 2 for choices
  let reply = "i picked " + bot + ". ";

  const playerStats = await db.getStats(playerID); //get current playcount and win/losses
  playerStats.rps.plays++; //the game is valid so increment play count
  //inc plays
  //9 possible cases, 3 are draws, 3 are wins, 3 are losses
  if (player === bot) {
    //draw
    reply += "draw, <:apephone:807943284919238656>";
  } else {
    //win or loss
    if (
      (player === "rock" && bot === "scissors") ||
      (player === "scissors" && bot === "paper") ||
      (player === "paper" && bot === "rock")
    ) {
      //player win
      playerStats.rps.wins++;
      //inc wins
      reply += "i lost, <:ookook:789577206253879306>";
    } else {
      //only left option is loss
      //player loss
      playerStats.rps.losses++;
      //inc loss
      reply += "i won, ez <:extremehapey:803680563709870182>";
    }
  }
  await db.setStats(playerID, playerStats); //return the updated stats and set
  return [reply];
}
