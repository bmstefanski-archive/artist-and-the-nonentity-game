import { CommandBus } from 'infrastructure/command/command.bus'
import { EventBus } from 'infrastructure/event/event.bus'
import { Module } from 'infrastructure/module/module'
import { ExecuteSkillCommand } from './execute-skill.command'
import { ExecuteSkillHandler } from './execute-skill.handler'
import { SkillFactory } from './skill.factory'

export class SkillModule implements Module {
  private readonly skillFactory: SkillFactory

  constructor(private readonly eventBus: EventBus, private readonly commandBus: CommandBus) {
    this.skillFactory = new SkillFactory(this.eventBus, this.commandBus)
  }

  public initializeCommands(): void {
    this.commandBus.registerAll({ command: ExecuteSkillCommand, handler: new ExecuteSkillHandler(this.skillFactory) })
  }

  public initializeEvents(): void {}
}
