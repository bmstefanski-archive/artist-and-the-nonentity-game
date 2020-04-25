import { mock } from 'jest-mock-extended'
import { CommandBus } from '../infrastructure/command/command.bus'
import { EventBus } from '../infrastructure/event/event.bus'
import { SkillNotFoundError } from './skill-not-found.error'
import { SkillFactory } from './skill.factory'
import { SkillType } from './skill.type'

describe('SkillFactory', () => {
  describe('makeSkill', () => {
    let skillFactory: SkillFactory

    beforeEach(() => {
      skillFactory = new SkillFactory(mock<EventBus>(), mock<CommandBus>())
    })

    it('should return new skill executer instance', () => {
      const skillExecuter = skillFactory.makeSkill(SkillType.THROWING_RHYME)

      expect(skillExecuter).toHaveProperty('execute')
    })

    it('should throw SkillNotFoundError when passed skillType does not exist', () => {
      expect(() => skillFactory.makeSkill('UNKNOWN_SKILL')).toThrow(SkillNotFoundError)
    })
  })
})
