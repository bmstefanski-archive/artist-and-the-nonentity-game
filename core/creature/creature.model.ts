import { SkillType } from 'skill/skill.type'

export class Creature {
  public readonly id: number
  public readonly name: string
  public readonly health: number
  public readonly strength: number
  public readonly lives: number
  public readonly skill: SkillType
}
