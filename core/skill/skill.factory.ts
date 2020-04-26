import { CommandBus } from 'infrastructure/command/command.bus'
import { EventBus } from 'infrastructure/event/event.bus'
import { SkillNotFoundError } from './skill-not-found.error'
import { SkillCreator } from './skill.creator'
import { SkillExecuter } from './skill.executer'
import { SkillType } from './skill.type'
import { ThrowRhymeSkillCreator } from './throw-rhyme.skill-creator'

export class SkillFactory {
  private readonly standardSkills: { [skillName: string]: SkillCreator }

  constructor(private readonly eventBus: EventBus, private readonly commandBus: CommandBus) {
    this.standardSkills = { [SkillType.THROWING_RHYME]: new ThrowRhymeSkillCreator(this.eventBus, this.commandBus) }
  }

  public makeSkill(skillName: string): SkillExecuter {
    const skill: SkillCreator = this.standardSkills[skillName]
    if (!skill) {
      throw new SkillNotFoundError(skillName)
    }
    return skill.create()
  }
}
