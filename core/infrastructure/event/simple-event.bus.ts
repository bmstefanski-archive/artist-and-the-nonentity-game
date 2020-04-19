import { EventBus } from './event.bus'
import { Event } from './event.marker'
import { NotifyCallback, Subscription } from './subscription.type'

export class SimpleEventBus implements EventBus {
  private subscriptions: Subscription[] = []
  private lastSubscriptionId: number = 0

  public publish(event: Event): void {
    if (this.isEventUndefinedOrNull(event)) {
      return
    }

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.notifyCallback(event)
    })
  }

  private isEventUndefinedOrNull(event: Event): boolean {
    return !event
  }

  public subscribe(notifyCallback: NotifyCallback): Subscription {
    const subscription = { notifyCallback, id: this.lastSubscriptionId += 1 }
    this.subscriptions.push(subscription)
    return subscription
  }
  public unsubscribe(subscription: Subscription): void {
    this.subscriptions = this.subscriptions.filter((item) => item.id !== subscription.id)
  }
}
