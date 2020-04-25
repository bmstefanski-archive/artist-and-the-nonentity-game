import { mock } from 'jest-mock-extended'
import { CommandBus } from '../infrastructure/command/command.bus'
import { EventBus } from '../infrastructure/event/event.bus'
import { SimpleEventBus } from '../infrastructure/event/simple-event.bus'
import { DataStorage } from '../infrastructure/storage/data-storage'
import { SkillType } from '../skill/skill.type'
import { CreateCreatureCommand } from './create-creature.command'
import { CreateCreatureHandler } from './create-creature.handler'
import { CreatureCreatedEvent } from './creature-created.event'

describe('CreateCreatureCommand', () => {
  const createCreatureDto = { id: 1, name: 'Test name', skill: SkillType.THROWING_RHYME }
  let eventBus: EventBus
  let commandBus: CommandBus

  beforeEach(() => {
    eventBus = new SimpleEventBus()
    commandBus = new CommandBus()
  })

  it('should store creature in data storage and publish event', () => {
    const storage = mock<DataStorage>()
    let lastPublishedEvent

    eventBus.registerAll({ event: CreatureCreatedEvent })
    eventBus.subscribe((event: any) => (lastPublishedEvent = event))
    commandBus.registerAll({ command: CreateCreatureCommand, handler: new CreateCreatureHandler(storage, eventBus) })
    commandBus.execute(new CreateCreatureCommand(createCreatureDto))

    expect(storage.save).toBeCalled()
    expect(lastPublishedEvent).toBeInstanceOf(CreatureCreatedEvent)
  })

  it('should publish event only if payload passes validation', () => {
    let lastPublishedEvent

    eventBus.registerAll({ event: CreatureCreatedEvent })
    eventBus.subscribe((event: any) => (lastPublishedEvent = event))
    commandBus.registerAll({ command: CreateCreatureCommand, handler: new CreateCreatureHandler(null, eventBus) })
    commandBus.execute(new CreateCreatureCommand({ ...createCreatureDto, name: '' }))

    expect(lastPublishedEvent).toBeUndefined()
  })
})
