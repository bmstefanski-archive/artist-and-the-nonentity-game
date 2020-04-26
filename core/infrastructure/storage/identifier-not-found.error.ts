export class IdentifierNotFound extends Error {
  constructor() {
    super(`Entity must have id property!`)
    Object.setPrototypeOf(this, IdentifierNotFound.prototype)
  }
}
