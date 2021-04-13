import { ICommandParser } from "./abstract-parser";

export interface ICommand {
  name: string;

  help: string;

  execute: (parameters: any) => any;
}

export interface AbstractCommandResult {
  messages: Array<string>;
}

export interface AbstractCommandState {
  command: ICommandParser;
  author: string;
  channel: string;
  question: string;
}
