import { EventBus } from './event.bus'
import { Event } from './event.marker'
import { SimpleEventBus } from './simple-event.bus'

class TestEvent implements Event {
  constructor(public readonly someData: any) {}
}

describe('SimpleEventBus', () => {
  it('null/undefined events should not be passed to notify function', () => {
    const eventBus: EventBus = new SimpleEventBus()
    let lastEvent

    eventBus.subscribe((event) => (lastEvent = event))
    eventBus.publish(null)

    expect(lastEvent).toBe(undefined)
  })

  it('subscriber should not receive event if executed synchronously before subscription', () => {
    const eventBus: EventBus = new SimpleEventBus()
    let lastEvent

    eventBus.publish(new TestEvent({ greetingMessage: 'Howdy!' }))
    eventBus.subscribe((event) => (lastEvent = event))

    expect(lastEvent).toBe(undefined)
  })

  it('subscriber should receive event executed after subscription', () => {
    const eventBus: EventBus = new SimpleEventBus()
    let lastEvent

    eventBus.subscribe((event) => (lastEvent = event))
    eventBus.publish(new TestEvent({ greetingMessage: 'Howdy!' }))

    expect(lastEvent).toBeInstanceOf(TestEvent)
  })

  it('subscriber should not receive events after getting unsubscribed', () => {
    const eventBus: EventBus = new SimpleEventBus()
    let lastEvent

    const subscription = eventBus.subscribe((event) => (lastEvent = event))
    eventBus.publish(new TestEvent({ called: 'beforeSubscription' }))
    eventBus.unsubscribe(subscription)
    eventBus.publish(new TestEvent({ called: 'afterSubscription' }))

    expect(lastEvent).toHaveProperty('someData.called', 'beforeSubscription')
  })
})
