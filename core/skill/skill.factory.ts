import { EventBus } from 'infrastructure/event/event.bus'
import { SkillCreator } from './skill-creator'
import { SkillNotFoundError } from './skill-not-found.error'
import { SkillExecuter } from './skill.executer'
import { SkillType } from './skill.type'
import { ThrowRhymeSkillCreator } from './throw-rhyme.skill-creator'

export class SkillFactory {
  private readonly standardSkills: { [skillName: string]: SkillCreator }

  constructor(private readonly eventBus: EventBus) {
    this.standardSkills = { [SkillType.THROWING_RHYME]: new ThrowRhymeSkillCreator(this.eventBus) }
  }

  public makeSkill(skillName: string): SkillExecuter {
    const skill: SkillCreator = this.standardSkills[skillName]
    if (!skill) {
      throw new SkillNotFoundError(skillName)
    }
    return skill.create()
  }
}
