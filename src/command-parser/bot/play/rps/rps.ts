import { ICommand } from "../../../abstracts/abstract-command";
import { Choices, RpsResult, WinType } from "./rps-types";

class Rps implements ICommand {
  name = "rps";
  help =
    "Play rock paper scissors, select desired item. \nUse --repeat # to play multiple times (1 to 10), and --random to select a random item";

  execute(parameters: { playerChoice: Choices }): RpsResult {
    return this.rps(parameters.playerChoice);
  }

  private rps(playerChoice: Choices): RpsResult {
    const botChoice = Object.values(Choices)[Math.floor(Math.random() * 3)];

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
      } else {
        playerWinType = WinType.LOSS;
      }
    }
    return {
      botChoice: botChoice,
      playerWin: playerWinType,
    };
  }
}

export const rps = new Rps();
