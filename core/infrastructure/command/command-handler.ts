import { Command } from './command.marker'

export interface CommandHandler<T extends Command> {
  execute(command: T): Promise<any>
}
