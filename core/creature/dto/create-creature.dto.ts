import { SkillType } from 'skill/skill.type'

export interface CreateCreatureDto {
  id: number
  name: string
  skill: SkillType
}
