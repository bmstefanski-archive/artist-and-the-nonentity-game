import { Command } from 'infrastructure/command/command.marker'
import { CreateCreatureDto } from './dto/create-creature.dto'

export class CreateCreatureCommand implements Command {
  constructor(public readonly dto: CreateCreatureDto) {}
}
