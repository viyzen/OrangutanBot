import { db } from "../Database";
import { rl } from "../RateLimiter";

export default async function (
  args: string[],
  playerID: string,
): Promise<string[]> {
  if (rl.isRateLimited(playerID, "rps", 1000)) {
    return;
  }
  const choices = ["rock", "paper", "scissors"];
  const player = args[0];
  if (!choices.includes(player)) {
    return ["Usage: `rps rock/paper/scissors`"];
  }
  const bot = choices[Math.floor(Math.random() * 3)];
  let reply = "i picked " + bot + ". ";

  const playerStats = await db.getStats(playerID);
  playerStats.rps.plays++;
  //inc plays
  if (player === bot) {
    reply += "draw, <:apephone:807943284919238656>";
  } else {
    if (
      (player === "rock" && bot === "scissors") ||
      (player === "scissors" && bot === "paper") ||
      (player === "paper" && bot === "rock")
    ) {
      playerStats.rps.wins++;
      //inc wins
      reply += "i lost, <:ookook:789577206253879306>";
    } else {
      playerStats.rps.losses++;
      //inc loss
      reply += "i won, ez <:extremehapey:803680563709870182>";
    }
  }
  await db.setStats(playerID, playerStats);
  return [reply];
}
