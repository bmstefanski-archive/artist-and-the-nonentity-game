import { SkillType } from 'skill/skill.type'

export class Creature {
  public readonly id: number
  public readonly name: string
  public readonly health: number = 1
  public readonly strength: number = 1
  public readonly lives: number = 1
  public readonly skill: SkillType
}
