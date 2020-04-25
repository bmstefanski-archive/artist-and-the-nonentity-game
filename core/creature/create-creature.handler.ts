import { CommandHandler } from 'infrastructure/command/command-handler'
import { EventBus } from 'infrastructure/event/event.bus'
import { DataStorage } from 'infrastructure/storage/data-storage'
import { CreateCreatureCommand } from './create-creature.command'
import { CreatureCreatedEvent } from './creature-created.event'
import { CreateCreatureDto } from './dto/create-creature.dto'
import { CreatureDto } from './dto/creature.dto'

export class CreateCreatureHandler implements CommandHandler<CreateCreatureCommand> {
  constructor(private readonly storage: DataStorage, private readonly eventBus: EventBus) {}

  public async execute(command: CreateCreatureCommand): Promise<void> {
    if (this.isDtoValid(command.dto)) {
      const defaultValues = { health: 1, strength: 2.5, lives: 1 }
      const storedCreature: CreatureDto = this.storage.save({ ...defaultValues, ...command.dto }) as CreatureDto
      this.eventBus.publish(new CreatureCreatedEvent(storedCreature))
    }
  }

  private isDtoValid(dto: CreateCreatureDto): boolean {
    return !!dto.id && !!dto.name
  }
}
