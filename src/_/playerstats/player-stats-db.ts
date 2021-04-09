import Keyv from "keyv";
import path from "path";

import { PlayerStats } from "./player-stats";

export class Database {
  private readonly stats: Keyv;

  constructor() {
    const dbstring =
      "sqlite://" + path.resolve(__dirname, "..", "database.sqlite");
    this.stats = new Keyv(dbstring, { namespace: "stats" });
    this.stats.on("error", (error) => console.log(error));
  }

  public async setStats(userID: string, stats: PlayerStats): Promise<boolean> {
    return this.stats.set(userID, stats);
  }

  public async getStats(userID: string): Promise<PlayerStats> {
    const stats: PlayerStats = await this.stats.get(userID);
    const blank = new PlayerStats();
    return { ...blank, ...stats };
  }
}

export const db = new Database();
