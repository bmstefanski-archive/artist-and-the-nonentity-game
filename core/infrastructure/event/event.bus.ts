import { EventWithHandlers } from './event-with-handlers.type'
import { Event } from './event.marker'
import { NotifyCallback, Subscription } from './subscription.type'

export interface EventBus {
  publish(event: Event): void
  subscribe(notifyCallback: NotifyCallback): Subscription
  unsubscribe(subscription: Subscription): void
  registerAll(...event: EventWithHandlers[]): void
}
