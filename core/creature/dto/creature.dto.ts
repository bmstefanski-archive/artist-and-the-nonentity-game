import { SkillType } from 'skill/skill.type'

export interface CreatureDto {
  id: number
  name: string
  health: number
  strength: number
  lives: number
  skill: SkillType
}
