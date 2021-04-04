import { db } from "../../../../playerstats/Database";
import { Choices, RpsResult, WinType } from "./rps.types";

export default async function (
  playerChoice: Choices,
  playerID: string,
): Promise<RpsResult> {
  const botChoice = Object.values(Choices)[Math.floor(Math.random() * 3)];

  const playerStats = await db.getStats(playerID);
  playerStats.rps.plays++;

  let playerWinType: WinType;

  if (playerChoice === botChoice) {
    playerWinType = WinType.DRAW;
  } else {
    if (
      (playerChoice === "ROCK" && botChoice === "SCISSORS") ||
      (playerChoice === "SCISSORS" && botChoice === "PAPER") ||
      (playerChoice === "PAPER" && botChoice === "ROCK")
    ) {
      playerWinType = WinType.WIN;
      playerStats.rps.wins++;
    } else {
      playerWinType = WinType.LOSS;
      playerStats.rps.losses++;
    }
  }
  if (playerStats.rps.plays % 500 == 0) {
    console.log(playerStats.rps);
  }
  await db.setStats(playerID, playerStats);

  return {
    botChoice: botChoice,
    playerWin: playerWinType,
  };
}
