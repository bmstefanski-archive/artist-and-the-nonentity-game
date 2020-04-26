import { mock } from 'jest-mock-extended'
import { CommandBus } from '../infrastructure/command/command.bus'
import { ExecuteSkillCommand } from '../skill/execute-skill.command'
import { ExecuteSkillHandler } from './execute-skill.handler'
import { SkillFactory } from './skill.factory'
import { SkillType } from './skill.type'

describe('ExecuteSkillCommand', () => {
  it('test', async () => {
    const commandBus: CommandBus = new CommandBus()
    const skillFactory = mock<SkillFactory>({
      makeSkill: jest.fn((skillName: SkillType) => ({ execute: async () => {} })),
    })

    commandBus.registerAll({ command: ExecuteSkillCommand, handler: new ExecuteSkillHandler(skillFactory) })
    await commandBus.execute(new ExecuteSkillCommand({ skill: SkillType.TEST } as any, null))

    expect(skillFactory.makeSkill).toBeCalled()
  })
})
