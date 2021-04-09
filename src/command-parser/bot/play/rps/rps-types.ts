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

export interface MultipleResults {
  playerWins: number;
  botWins: number;
  draws: number;
  botLastChoice: Choices;
}
