export class PlayerStats {
  rps: {
    wins: number;
    losses: number;
    plays: number;
  };

  constructor() {
    this.rps = { wins: 0, losses: 0, plays: 0 };
  }
}
