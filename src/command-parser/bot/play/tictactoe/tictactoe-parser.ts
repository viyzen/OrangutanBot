import { AbstractCommandResult } from "../../../abstracts/abstract-command";

//bot play rps <>
export class TicTacToeParser {
  public parseCommand(args: string): AbstractCommandResult {
    console.log(args);
    return;
  }
}
