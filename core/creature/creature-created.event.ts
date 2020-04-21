import { Event } from 'infrastructure/event/event.marker'
import { CreatureDto } from './dto/creature.dto'

export class CreatureCreatedEvent implements Event {
  constructor(public readonly creature: CreatureDto) {}
}
