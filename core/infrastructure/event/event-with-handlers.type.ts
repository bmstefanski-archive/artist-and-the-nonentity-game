import { EventHandler } from './event-handler'
import { Event } from './event.marker'

export type EventWithHandlers = { event: Event; handlers?: EventHandler<any>[] }
