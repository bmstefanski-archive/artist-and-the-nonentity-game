import { CreatureDto } from 'creature/dto/creature.dto'
import { Command } from 'infrastructure/command/command.marker'

export class ExecuteSkillCommand implements Command {
  constructor(public readonly from: CreatureDto, public readonly to: CreatureDto) {}
}
