export interface ICommand {
  name: string;

  help: string;

  execute: (parameters: any) => any;
}

export interface AbstractCommandResult {
  messages: Array<string>;
}
