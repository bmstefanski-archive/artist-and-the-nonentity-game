import { CommandHandler } from './command-handler'
import { CommandNotFoundError } from './command-not-found.error'
import { CommandWithHandler } from './command-with-handler.type'
import { Command } from './command.marker'

export class CommandBus {
  private readonly registeredCommands: CommandWithHandler<Command>[] = []

  public async execute<T extends Command>(command: T): Promise<any> {
    return this.findOrThrow<T>(command).execute(command)
  }

  private findOrThrow<T extends Command>(command: T): CommandHandler<T> {
    const commandName = command.constructor.name
    const result = this.findCommand<T>(commandName)

    this.ensureCommandIsPresent(result, commandName)
    return result.handler
  }

  private findCommand<T extends Command>(commandName: string): CommandWithHandler<T> | undefined {
    return this.registeredCommands.find((item: any) => item.command.name === commandName)
  }

  private ensureCommandIsPresent(command: Command, commandName: string): void {
    if (!command) {
      throw new CommandNotFoundError(commandName)
    }
  }

  public registerAll<T extends Command>(...commands: CommandWithHandler<T>[]): void {
    this.registeredCommands.push(...commands)
  }
}
