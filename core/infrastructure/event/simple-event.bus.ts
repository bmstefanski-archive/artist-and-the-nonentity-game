import { EventHandler } from './event-handler'
import { EventWithHandlers } from './event-with-handlers.type'
import { EventBus } from './event.bus'
import { Event } from './event.marker'
import { NotifyCallback, Subscription } from './subscription.type'

export class SimpleEventBus implements EventBus {
  private lastSubscriptionId: number = 0
  private subscriptions: Subscription[] = []
  private readonly registeredEvents: EventWithHandlers[] = []

  public publish(event: Event): void {
    if (this.isEventUndefinedOrNull(event)) {
      return
    }
    this.executeBondedHandlers(event)

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.notifyCallback(event)
    })
  }

  private isEventUndefinedOrNull(event: Event): boolean {
    return !event
  }

  private executeBondedHandlers(event: Event): void {
    const registeredEvent = this.findEventOrReturnEmpty(event.constructor.name)
    registeredEvent.handlers.forEach((handler: EventHandler<typeof event>) => handler.execute(event))
  }

  private findEventOrReturnEmpty(eventName: string): EventWithHandlers {
    const emptyEvent: EventWithHandlers = { event: null, handlers: [] }
    return this.registeredEvents.find((item: any) => item.event.name === eventName) || emptyEvent
  }

  public subscribe(notifyCallback: NotifyCallback): Subscription {
    const subscription = { notifyCallback, id: this.lastSubscriptionId += 1 }
    this.subscriptions.push(subscription)
    return subscription
  }

  public unsubscribe(subscription: Subscription): void {
    this.subscriptions = this.subscriptions.filter((item) => item.id !== subscription.id)
  }

  public registerAll(...events: EventWithHandlers[]): void {
    events.forEach((event) => this.register(event))
  }

  public register(event: EventWithHandlers): void {
    this.registeredEvents.push(event)
  }
}
