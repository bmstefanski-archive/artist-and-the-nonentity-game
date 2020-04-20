import { CommandHandler } from './command-handler'
import { Command } from './command.marker'

export type CommandWithHandler<T> = { command: Command; handler: CommandHandler<T> }
