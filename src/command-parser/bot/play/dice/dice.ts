import { ICommand } from "../../../abstracts/abstract-command";
import { DiceResult } from "./dice-types";

class Dice implements ICommand {
  name = "dice";
  help = "Roll dice, select number of times to roll (1 to 100)";

  execute(parameters: { rollCount: number }): DiceResult {
    return this.dice(parameters.rollCount);
  }

  private dice(rollCount: number): DiceResult {
    const dice = [1, 2, 3, 4, 5, 6];

    let rollTotal = 0;

    for (let i = 0; i < rollCount; i++) {
      rollTotal += dice[Math.floor(Math.random() * 6)];
    }

    const rollAvg = +(rollTotal / rollCount).toFixed(3);

    return {
      rollCount: rollCount,
      rollAvg: rollAvg,
      rollTotal: rollTotal,
    };
  }
}

export const dice = new Dice();
