import { mock } from 'jest-mock-extended'
import { CommandBus } from '../infrastructure/command/command.bus'
import { EventBus } from '../infrastructure/event/event.bus'
import { SkillNotFoundError } from './skill-not-found.error'
import { SkillFactory } from './skill.factory'
import { SkillType } from './skill.type'

describe('SkillFactory', () => {
  describe('makeSkill', () => {
    it('should return new skill executer instance', () => {
      const eventBus = mock<EventBus>()
      const commandBus = mock<CommandBus>()

      const skillExecuter = new SkillFactory(eventBus, commandBus).makeSkill(SkillType.THROWING_RHYME)

      expect(skillExecuter).toHaveProperty('execute')
    })

    it('should throw SkillNotFoundError when passed skillType does not exist', () => {
      const eventBus = mock<EventBus>()
      const commandBus = mock<CommandBus>()

      const skillFactory = new SkillFactory(eventBus, commandBus)
      expect(() => skillFactory.makeSkill('UNKNOWN_SKILL')).toThrow(SkillNotFoundError)
    })
  })
})
