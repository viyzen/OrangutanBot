import { ICommand } from "../../../abstracts/abstract-command";
import { DiceResult } from "./dice-types";

class Dice implements ICommand {
  name = "dice";
  help =
    "Roll 6 sided dice, select number of times to roll (1 to 100), and use --d (2 - 100) to roll a dice with a different number of sides";

  execute(parameters: { rollCount: number; diceSides: number }): DiceResult {
    return this.dice(parameters.rollCount, parameters.diceSides);
  }

  private dice(rollCount: number, diceSides: number): DiceResult {
    let rollTotal = 0;

    for (let i = 0; i < rollCount; i++) {
      rollTotal += Math.floor(Math.random() * diceSides) + 1;
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
