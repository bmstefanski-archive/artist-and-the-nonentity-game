import { mock } from 'jest-mock-extended'
import { CreatureUpdatedEvent } from '../creature/creature-updated.event'
import { CreatureDto } from '../creature/dto/creature.dto'
import { UpdateCreatureCommand } from '../creature/update-creature.command'
import { CommandBus } from '../infrastructure/command/command.bus'
import { EventBus } from '../infrastructure/event/event.bus'
import { Event } from '../infrastructure/event/event.marker'
import { NotifyCallback } from '../infrastructure/event/subscription.type'
import { SkillExecuter } from './skill.executer'
import { SkillType } from './skill.type'
import { ThrowRhymeSkillCreator } from './throw-rhyme.skill-creator'

class BogusEvent implements Event {}

describe('ThrowRhymeSkillCreator', () => {
  const from: CreatureDto = {
    id: 1,
    name: 'From creature',
    skill: SkillType.THROWING_RHYME,
    health: 1,
    lives: 1,
    strength: 1,
  }
  const to: CreatureDto = {
    id: 2,
    name: 'To creature',
    skill: SkillType.THROWING_RHYME,
    health: 1,
    lives: 1,
    strength: 1,
  }
  const subscriptions = []

  let eventBus: EventBus
  let commandBus: CommandBus
  let skillExecuter: SkillExecuter

  beforeEach(() => {
    eventBus = mock<EventBus>()
    commandBus = mock<CommandBus>()
    skillExecuter = new ThrowRhymeSkillCreator(eventBus, commandBus).create()

    eventBus.subscribe = (notifyCallback: NotifyCallback) => {
      subscriptions.push({ notify: notifyCallback })
      return { notifyCallback, id: 1 }
    }

    jest.useFakeTimers()
  })

  it('should multiply the strength points by taken damage', async () => {
    await skillExecuter.execute(from, to)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(1, { health: 0.7 })))

    expect(commandBus.execute).toBeCalledWith(new UpdateCreatureCommand(2, { health: 0.4 }))
  })

  it('should exit the method if victim is null', async () => {
    await skillExecuter.execute(null, to)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(1, { health: 0.7 })))

    expect(commandBus.execute).not.toBeCalled()
  })

  it('should exit the method if victim is dead', async () => {
    const mutableFrom = { ...from }
    mutableFrom.lives = 0
    mutableFrom.health = 0

    await skillExecuter.execute(mutableFrom, to)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(1, { health: 0.7 })))

    expect(commandBus.execute).not.toBeCalled()
  })

  it('should exit the method if attacker is null', async () => {
    await skillExecuter.execute(from, null)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(1, { health: 0.7 })))

    expect(commandBus.execute).not.toBeCalled()
  })

  it('should exit the method if attacker is dead', async () => {
    const mutableTo = { ...to }
    mutableTo.lives = 0
    mutableTo.health = 0

    await skillExecuter.execute(mutableTo, to)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(1, { health: 0.7 })))

    expect(commandBus.execute).not.toBeCalled()
  })

  it('should not react if it is not CreatureUpdatedEvent', async () => {
    await skillExecuter.execute(from, to)
    subscriptions.forEach((sub) => sub.notify(new BogusEvent()))

    expect(commandBus.execute).not.toBeCalled()
  })

  it('should not react if passed id is not equal to victim id', async () => {
    await skillExecuter.execute(from, to)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(999, { health: 0.7 })))

    expect(commandBus.execute).not.toBeCalled()
  })

  it('should not react if taken attack is not critical', async () => {
    await skillExecuter.execute(from, to)
    subscriptions.forEach((sub) => sub.notify(new CreatureUpdatedEvent(1, { health: 0.9 })))

    expect(commandBus.execute).not.toBeCalled()
  })
})
