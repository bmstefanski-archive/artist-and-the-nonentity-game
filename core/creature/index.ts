import { CommandBus } from 'infrastructure/command/command.bus'
import { EventBus } from 'infrastructure/event/event.bus'
import { Module } from 'infrastructure/module/module'
import { DataStorage } from 'infrastructure/storage/data-storage'
import { CreateCreatureCommand } from './create-creature.command'
import { CreateCreatureHandler } from './create-creature.handler'
import { CreatureCreatedEvent } from './creature-created.event'
import { CreatureUpdatedEvent } from './creature-updated.event'
import { UpdateCreatureCommand } from './update-creature.command'
import { UpdateCreatureHandler } from './update-creature.handler'

export class CreatureModule implements Module {
  constructor(
    private readonly storage: DataStorage,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  public initializeCommands(): void {
    this.commandBus.registerAll(
      { command: CreateCreatureCommand, handler: new CreateCreatureHandler(this.storage, this.eventBus) },
      { command: UpdateCreatureCommand, handler: new UpdateCreatureHandler(this.storage, this.eventBus) },
    )
  }

  public initializeEvents(): void {
    this.eventBus.registerAll({ event: CreatureCreatedEvent }, { event: CreatureUpdatedEvent })
  }
}
