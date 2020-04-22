import { Event } from 'infrastructure/event/event.marker'

export class CreatureUpdatedEvent implements Event {
  constructor(public readonly updatedProperties: any) {}
}
