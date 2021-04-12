import pgPromise, { IDatabase, PreparedStatement } from "pg-promise";

import { PlayerStatsModel } from "./model/player-stats-model";

const pgp = pgPromise();

class SqlDatabase {
  public connection: IDatabase<any>;

  constructor(
    host: string,
    user: string,
    password: string,
    port: number,
    database: string,
  ) {
    this.connection = pgp({ host, user, password, port, database });
  }
  async connect() {
    return this.connection.connect();
  }
}

class PlayerStatsRepository {
  constructor(private readonly connection: IDatabase<any>) {}

  public async findPlayerStatsByUserId(
    userID: string,
  ): Promise<PlayerStatsModel> {
    const query = new PreparedStatement({
      name: "find-playerstats",
      text: "SELECT * FROM orangutanbot.playerstats WHERE id = $1",
      values: [userID],
    });

    return await this.connection.oneOrNone(query);
  }

  public async createNewPlayerStatsForUserId(userID: string): Promise<void> {
    const query = new PreparedStatement({
      name: "create-playerstats",
      text: "INSERT INTO orangutanbot.playerstats(id) VALUES($1)",
      values: [userID],
    });
    try {
      await this.connection.oneOrNone(query);
    } catch (error) {
      console.log(error);
    }
  }

  public async updatePlayerStatsForUserId(
    playerStats: PlayerStatsModel,
  ): Promise<void> {
    const query = new PreparedStatement({
      name: "update-playerstats",
      text:
        "UPDATE orangutanbot.playerstats SET rpsplays = $2, rpswins = $3, rpslosses = $4, rpsdraws = $5, dicerolls = $6 WHERE id = $1",
      values: [
        playerStats.id,
        playerStats.rpsplays,
        playerStats.rpswins,
        playerStats.rpslosses,
        playerStats.rpsdraws,
        playerStats.dicerolls,
      ],
    });
    try {
      await this.connection.oneOrNone(query);
    } catch (error) {
      console.log(error);
    }
  }
}

async function setupDB(): Promise<PlayerStatsRepository> {
  const sqlDatabase = await connectToDatabase();
  return new PlayerStatsRepository(sqlDatabase.connection);
}

async function connectToDatabase(): Promise<SqlDatabase> {
  const newDatabase = new SqlDatabase(
    "127.0.0.1",
    "postgres",
    process.env["DB"],
    55556,
    "postgres",
  );
  await newDatabase.connect();
  return newDatabase;
}

export const db = setupDB();
