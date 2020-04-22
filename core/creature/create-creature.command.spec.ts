import { CommandBus } from '../infrastructure/command/command.bus'
import { SimpleEventBus } from '../infrastructure/event/simple-event.bus'
import { DataStorage } from '../infrastructure/storage/data-storage'
import { SkillType } from '../skill/skill.type'
import { CreateCreatureCommand } from './create-creature.command'
import { CreateCreatureHandler } from './create-creature.handler'
import { CreatureCreatedEvent } from './creature-created.event'
import { CreateCreatureDto } from './dto/create-creature.dto'

describe('CreateCreatureCommand', () => {
  it('should store creature in data storage and publish event', () => {
    const eventBus = new SimpleEventBus()
    const commandBus = new CommandBus()
    const storage: DataStorage = { save: jest.fn(() => {}), findOne: undefined, delete: undefined }
    const createCreatureDto: CreateCreatureDto = { id: 1, name: 'Test name', skill: SkillType.THROWING_RHYME }
    let lastPublishedEvent

    eventBus.registerAll({ event: CreatureCreatedEvent })
    eventBus.subscribe((event: any) => (lastPublishedEvent = event))
    commandBus.registerAll({ command: CreateCreatureCommand, handler: new CreateCreatureHandler(storage, eventBus) })
    commandBus.execute(new CreateCreatureCommand(createCreatureDto))

    expect(storage.save).toBeCalled()
    expect(lastPublishedEvent).toBeInstanceOf(CreatureCreatedEvent)
  })

  it('should publish event only if payload passes validation', () => {
    const eventBus = new SimpleEventBus()
    const commandBus = new CommandBus()
    const createCreatureDto: CreateCreatureDto = { id: 1, name: '', skill: SkillType.THROWING_RHYME }
    let lastPublishedEvent

    eventBus.registerAll({ event: CreatureCreatedEvent })
    eventBus.subscribe((event: any) => (lastPublishedEvent = event))
    commandBus.registerAll({ command: CreateCreatureCommand, handler: new CreateCreatureHandler(null, eventBus) })
    commandBus.execute(new CreateCreatureCommand(createCreatureDto))

    expect(lastPublishedEvent).toBeUndefined()
  })
})
