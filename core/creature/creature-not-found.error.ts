export class CreatureNotFoundError extends Error {
  constructor(creatureId: number) {
    super(`There is no creature with such id: ${creatureId}`)
    Object.setPrototypeOf(this, CreatureNotFoundError.prototype)
  }
}
