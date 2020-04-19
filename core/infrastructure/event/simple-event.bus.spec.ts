import { EventHandler } from './event-handler'
import { EventBus } from './event.bus'
import { Event } from './event.marker'
import { SimpleEventBus } from './simple-event.bus'

class TestEventHandler implements EventHandler<TestEvent> {
  public async execute(event: TestEvent): Promise<void> {}
}

class AnotherTestEventHandler implements EventHandler<TestEvent> {
  public async execute(event: TestEvent): Promise<void> {}
}

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

  it('registered event handler should react when event gets published', () => {
    const eventBus: EventBus = new SimpleEventBus()
    const handlerInstance = new TestEventHandler()
    let executed = false

    handlerInstance.execute = async (event: TestEvent) => {
      executed = true
    }
    eventBus.register({ event: TestEvent, handlers: [handlerInstance] })
    eventBus.publish(new TestEvent({ greeting: 'Howdy!' }))

    expect(executed).toStrictEqual(true)
  })

  it('event should be able to notify multiple handlers when gets published', () => {
    const eventBus: EventBus = new SimpleEventBus()
    const firstHandlerInstance = new TestEventHandler()
    const secondHandlerInstance = new AnotherTestEventHandler()
    const executedHandlers = []

    firstHandlerInstance.execute = async (event: TestEvent) => {
      executedHandlers.push('first')
    }
    secondHandlerInstance.execute = async (event: TestEvent) => {
      executedHandlers.push('second')
    }
    eventBus.register({ event: TestEvent, handlers: [firstHandlerInstance, secondHandlerInstance] })
    eventBus.publish(new TestEvent({ greeting: 'Howdy!' }))

    expect(executedHandlers).toEqual(['first', 'second'])
  })
})
