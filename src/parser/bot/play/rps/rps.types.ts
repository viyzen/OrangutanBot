export enum Choices {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

export enum WinType {
  WIN = "WIN",
  LOSS = "LOSS",
  DRAW = "DRAW",
}

export interface RpsResult {
  botChoice: Choices;
  playerWin: WinType;
}
