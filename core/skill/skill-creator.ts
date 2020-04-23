import { CreatureDto } from 'creature/dto/creature.dto'
import { CommandBus } from 'infrastructure/command/command.bus'
import { EventBus } from 'infrastructure/event/event.bus'
import { SkillExecuter } from './skill.executer'

export abstract class SkillCreator {
  constructor(protected readonly eventBus: EventBus, protected readonly commandBus: CommandBus) {}

  public create(): SkillExecuter {
    return { execute: this.executeSkill.bind(this) }
  }

  protected abstract async executeSkill(from: CreatureDto, to: CreatureDto): Promise<void>
}
