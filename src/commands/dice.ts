import { db } from "../Database";
import { rl } from "../RateLimiter";

export default async function (
  args: string[],
  playerID: string,
): Promise<string[]> {
  if (rl.isRateLimited(playerID, "dice", 1000)) {
    //1000 ms ratelimit
    return;
  }
  const dice = [1, 2, 3, 4, 5, 6];
  //represents the faces of dice
  const playerRolls = Number.parseInt(args[0]);
  if (isNaN(playerRolls)) {
    return ["Usage: `dice <1 to 100>`"];
  }
  const MAX_ROLLS = 100;
  const MIN_ROLLS = 1;
  if (!(MIN_ROLLS <= playerRolls && playerRolls <= MAX_ROLLS)) {
    return ["Roll number can only be between 1 and 100"];
  }
  const playerStats = await db.getStats(playerID); //get current playcount and win/losses
  playerStats.dice.plays += playerRolls; //increment based on rolls
  await db.setStats(playerID, playerStats);

  let randomRoll = Number();
  let rollTotal = Number();
  for (let i = 0; i < playerRolls; i++) {
    randomRoll = dice[Math.floor(Math.random() * 6)];
    rollTotal += randomRoll;
  }
  const avgRoll = rollTotal / playerRolls;

  return [
    "In " +
      playerRolls +
      " you rolled a total of: " +
      rollTotal +
      "\nAverage roll: " +
      avgRoll,
  ];
}
