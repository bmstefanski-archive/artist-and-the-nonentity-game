import { mock } from 'jest-mock-extended'
import { CommandBus } from '../infrastructure/command/command.bus'
import { EventBus } from '../infrastructure/event/event.bus'
import { SkillCreator } from './skill.creator'

class TestSkillCreatorImpl extends SkillCreator {
  protected async executeSkill(from: any, to: any): Promise<void> {}
}

// tslint:disable no-string-literal
describe('SkillCreator', () => {
  let eventBus: EventBus
  let commandBus: CommandBus
  let skillCreator: SkillCreator

  beforeEach(() => {
    eventBus = mock<EventBus>()
    commandBus = mock<CommandBus>()
    skillCreator = new TestSkillCreatorImpl(eventBus, commandBus)
  })

  it('should create an instance of skill executer', () => {
    const skillExecuter = skillCreator.create()

    expect(skillExecuter).toHaveProperty('execute')
  })

  it('should create an instance of skill executer and execute skill', async () => {
    let executed = false

    skillCreator['executeSkill'] = async (from: any, to: any): Promise<void> => {
      executed = true
    }
    const skillExecuter = skillCreator.create()
    await skillExecuter.execute(null, null)

    expect(executed).toStrictEqual(true)
  })
})
