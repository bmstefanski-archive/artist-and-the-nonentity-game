import { CreatureDto } from 'creature/dto/creature.dto'

export interface SkillExecuter {
  execute(from: CreatureDto, to: CreatureDto): Promise<void>
}
