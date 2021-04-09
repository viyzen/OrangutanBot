import { AbstractCommandResult } from "../../abstracts/abstract-command";
import { OptionsParser } from "../../options-parser";
import { ParsedInput } from "../../parsed-input";
import { ddd } from "./ddd";

export class DddParser {
  public async parseCommand(args: string): Promise<AbstractCommandResult> {
    const MAX_WORDS = 20;

    const options = OptionsParser.getOptions(args);

    let wordCount = parseInt(ParsedInput.getCurrentWord(args));

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case "--help":
          return { messages: [ddd.help] };
        case "--r":
          wordCount = Math.floor(Math.random() * (MAX_WORDS - 1)) + 1;
      }
    }

    if (isNaN(wordCount) || wordCount > MAX_WORDS || wordCount < 1) {
      return { messages: [ddd.help] };
    }

    const results = ddd.execute({ wordCount });

    const result = results.dWordList.join(" ");

    return {
      messages: [result + " last wave kick. 🍓"],
    };
  }
}
