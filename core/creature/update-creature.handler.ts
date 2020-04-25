import { CommandHandler } from 'infrastructure/command/command-handler'
import { EventBus } from 'infrastructure/event/event.bus'
import { DataStorage } from 'infrastructure/storage/data-storage'
import { pick } from 'lodash'
import { CreatureNotFoundError } from './creature-not-found.error'
import { CreatureUpdatedEvent } from './creature-updated.event'
import { CreatureDto } from './dto/creature.dto'
import { UpdateCreatureDto } from './dto/update-creature.dto'
import { UpdateCreatureCommand } from './update-creature.command'

export class UpdateCreatureHandler implements CommandHandler<UpdateCreatureCommand> {
  constructor(private readonly dataStorage: DataStorage, private readonly eventBus: EventBus) {}

  public async execute(command: UpdateCreatureCommand): Promise<void> {
    const { id, dto } = command
    const creature = await this.findOrThrow(id)

    const payloadToSave = { id, ...creature, ...dto }
    const changedProperties = this.differentiateChangedProperties(payloadToSave, dto)

    this.dataStorage.save(payloadToSave)
    this.eventBus.publish(new CreatureUpdatedEvent(id, changedProperties))
  }

  private async findOrThrow(id: number): Promise<CreatureDto> {
    const creature = await this.dataStorage.findOne(id)
    if (!creature) {
      throw new CreatureNotFoundError(id)
    }

    return creature as CreatureDto
  }

  private differentiateChangedProperties(originalObject: CreatureDto, dto: UpdateCreatureDto): any {
    return pick(originalObject, Object.keys(dto))
  }
}
