export class CommandNotFoundError extends Error {
  constructor(commandName: string) {
    super(`There is no command with such name: ${commandName}`)
    Object.setPrototypeOf(this, CommandNotFoundError.prototype)
  }
}
