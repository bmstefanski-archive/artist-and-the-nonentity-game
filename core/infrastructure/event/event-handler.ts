import { Event } from './event.marker'

export interface EventHandler<T extends Event> {
  execute(event: T): Promise<void>
}
