import { DiscordCommandResult } from "../../../../discordCommandResult";
import { ParsedInput } from "../../../ParsedInput";
import { SpecialArgumentsParser } from "../../../specialArgParser";
import rps from "./rps";
import { Choices } from "./rps.types";

interface MultipleResults {
  playerWins: number;
  botWins: number;
  draws: number;
  scissorBotCount: number;
  rockBotCount: number;
  paperBotCount: number;
}

export class RpsParser {
  public async parseCommand(
    args: string,
    userID: string,
  ): Promise<DiscordCommandResult> {
    const options = SpecialArgumentsParser.getOptions(args);

    let numberOfRepeats = 1;

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case "--help":
          return { messages: ["Usage: `rps rock/paper/scissors`"] };
        case "--repeat":
          const repeatTime = parseInt(value, 10);
          if (isNaN(repeatTime) || repeatTime >= 10 || repeatTime <= 0) {
            return { messages: ["Usage: --repeat (number from 1 to 10)"] };
          }
          numberOfRepeats = repeatTime;
      }
    }
    const playerChoice: Choices = <any>(
      ParsedInput.getCurrentWord(args)?.toUpperCase()
    );
    if (!Object.values(Choices).includes(playerChoice)) {
      return { messages: ["Usage: `rps rock/paper/scissors`"] };
    }

    const results: MultipleResults = {
      playerWins: 0,
      botWins: 0,
      draws: 0,
      scissorBotCount: 0,
      rockBotCount: 0,
      paperBotCount: 0,
    };

    for (let i = 0; i < numberOfRepeats; i++) {
      const result = await rps(playerChoice, userID);
      results.playerWins += result.playerWin === "WIN" ? 1 : 0;
      results.botWins += result.playerWin === "LOSS" ? 1 : 0;
      results.draws += result.playerWin === "DRAW" ? 1 : 0;
      results.scissorBotCount += result.botChoice === "SCISSORS" ? 1 : 0;
      results.rockBotCount += result.botChoice === "ROCK" ? 1 : 0;
      results.paperBotCount += result.botChoice === "PAPER" ? 1 : 0;
    }

    if (numberOfRepeats === 1) {
      const botChoice = results.scissorBotCount
        ? "SCISSORS"
        : results.rockBotCount
        ? "ROCK"
        : "PAPER";
      const wldReply = results.playerWins
        ? "i lost"
        : results.botWins
        ? "i win"
        : "its a draw";
      return {
        messages: ["i picked " + botChoice + ". " + wldReply],
      };
    } else {
      return {
        messages: [
          "my wins: " +
            results.botWins +
            "\nyour wins: " +
            results.playerWins +
            "\ndraws: " +
            results.draws,
        ],
      };
    }
  }
}
