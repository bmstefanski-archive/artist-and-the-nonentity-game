import { SkillDto } from 'skill/dto/skill.dto'

export interface CreateCreatureDto {
  id: number
  name: string
  skills: SkillDto[]
}
