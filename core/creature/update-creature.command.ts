import { Command } from 'infrastructure/command/command.marker'
import { UpdateCreatureDto } from './dto/update-creature.dto'

export class UpdateCreatureCommand implements Command {
  constructor(public readonly id: number, public readonly dto: UpdateCreatureDto) {}
}
