import { ParsedInput } from "./ParsedInput";

export class SpecialArgumentsParser {
  public static getOptions(message: string): { [key: string]: string } {
    if (!message) {
      return {};
    }
    // 'tacobot add kl player --tags tag1 --comment a random comment'
    // should return
    // {--tags: tag1, --comment: a random comment}
    if (message.startsWith("--")) {
      message = " " + message; // We have to do that otherwise match(/( --.*)/) will not match the first option
    }
    const fullOptionsStringArray: Array<string> = message.match(/( --.*)/);
    if (!fullOptionsStringArray) {
      return {};
    }
    const fullOptionsString: string = fullOptionsStringArray[0];
    // we now have '--tags tag1 --comment a random comment'

    if (!fullOptionsString) {
      return {};
    }

    let arrayOptions: Array<string> = SpecialArgumentsParser.splitByDoubleDashesExceptInQuotes(
      fullOptionsString,
    );
    // we now have ['tags tag1', 'comment a random comment']

    if (arrayOptions) {
      arrayOptions = arrayOptions.filter((option: string) => !!option);
    }

    const returnValue: { [key: string]: string } = {};
    for (let i = 0; i < arrayOptions.length; i++) {
      const fullOption: string = "--" + arrayOptions[i].toLowerCase();
      const optionName: string = ParsedInput.getCurrentWord(fullOption);
      returnValue[optionName] = fullOption.substring(optionName.length).trim();
    }
    return returnValue;
  }

  private static splitByDoubleDashesExceptInQuotes(
    string: string,
  ): Array<string> {
    const array: Array<string> = string.split(
      new RegExp('--(?=(?:[^\\"]*\\"[^\\"]*\\")*[^\\"]*$)'),
    );
    if (!array) {
      return [];
    }
    return array.filter((resultString: string) => {
      return resultString.trim() !== "";
    });
  }
}
