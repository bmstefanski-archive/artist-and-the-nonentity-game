import { SkillDto } from 'skill/dto/skill.dto'

export interface CreatureDto {
  id: number
  name: string
  health: number
  strength: number
  lives: number
  skills: SkillDto[]
}
