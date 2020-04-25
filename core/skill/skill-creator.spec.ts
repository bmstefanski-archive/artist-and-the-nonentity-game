import { mock } from 'jest-mock-extended'
import { CommandBus } from '../infrastructure/command/command.bus'
import { EventBus } from '../infrastructure/event/event.bus'
import { SkillCreator } from './skill-creator'

class TestSkillCreatorImpl extends SkillCreator {
  protected async executeSkill(from: any, to: any): Promise<void> {}
}

describe('SkillCreator', () => {
  it('should create an instance of skill executer', () => {
    const eventBus = mock<EventBus>()
    const commandBus = mock<CommandBus>()
    const testCreator: SkillCreator = new TestSkillCreatorImpl(eventBus, commandBus)

    const skillExecuter = testCreator.create()

    expect(skillExecuter).toHaveProperty('execute')
  })

  it('should create an instance of skill executer and execute skill', async () => {
    const eventBus = mock<EventBus>()
    const commandBus = mock<CommandBus>()
    const testCreator: SkillCreator = new TestSkillCreatorImpl(eventBus, commandBus)
    let executed = false

    // tslint:disable-next-line: no-string-literal
    testCreator['executeSkill'] = async (from: any, to: any): Promise<void> => {
      executed = true
    }
    const skillExecuter = testCreator.create()
    await skillExecuter.execute(null, null)

    expect(executed).toStrictEqual(true)
  })
})
