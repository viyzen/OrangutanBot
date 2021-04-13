import { Message } from "discord.js";

import {
  AbstractCommandResult,
  AbstractCommandState,
} from "./abstract-command";

export interface ICommandParser {
  parseCommand: (
    args: string,
    message: Message,
    commandState?: AbstractCommandState,
  ) => Promise<AbstractCommandResult>;
}
