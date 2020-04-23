export class SkillNotFoundError extends Error {
  constructor(skillName: string) {
    super(`There is no skill with such name: ${skillName}`)
    Object.setPrototypeOf(this, SkillNotFoundError.prototype)
  }
}
