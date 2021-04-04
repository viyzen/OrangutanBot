export class PlayerStats {
  rps: {
    wins: number;
    losses: number;
    plays: number;
  };
  dice: {
    plays: number;
  };

  constructor() {
    this.rps = { wins: 0, losses: 0, plays: 0 };
    this.dice = { plays: 0 };
  }
}
