import { CommandHandler } from './command-handler'
import { CommandNotFoundError } from './command-not-found.error'
import { CommandBus } from './command.bus'
import { Command } from './command.marker'

class TestCommand implements Command {
  constructor(public readonly someData: any) {}
}

class AsyncTestCommand implements Command {
  constructor(public readonly someData: any) {}
}

class TestCommandHandler implements CommandHandler<TestCommand> {
  public async execute(command: TestCommand): Promise<{ greetings: string }> {
    return { greetings: `${command.someData.greetings} :)` }
  }
}

class AsyncTestCommandHandler implements CommandHandler<TestCommand> {
  public async execute(command: TestCommand): Promise<{ greetings: string }> {
    const simulatedAsyncAction = await new Promise((resolve) => setTimeout(() => resolve(':)'), 0))
    return { greetings: `${command.someData.greetings} ${simulatedAsyncAction}` }
  }
}

describe('CommandBus', () => {
  it('command bus should return command results', async () => {
    const commandBus = new CommandBus()

    commandBus.registerAll({ command: TestCommand, handler: new TestCommandHandler() })
    const result = await commandBus.execute(new TestCommand({ greetings: 'Howdy' }))

    expect(result).toHaveProperty('greetings', 'Howdy :)')
  })

  it('command bus should return command results even if handler has async operations', async () => {
    const commandBus = new CommandBus()

    commandBus.registerAll({ command: AsyncTestCommand, handler: new AsyncTestCommandHandler() })
    const result = await commandBus.execute(new AsyncTestCommand({ greetings: 'Howdy' }))

    expect(result).toHaveProperty('greetings', 'Howdy :)')
  })

  it('execute method should throw error if specified command is not registered', async () => {
    const commandBus = new CommandBus()

    const executePromise = commandBus.execute(new TestCommand({ greetings: 'Howdy' }))

    await expect(executePromise).rejects.toThrow(CommandNotFoundError)
  })
})
