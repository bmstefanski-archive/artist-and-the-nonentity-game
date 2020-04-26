import { CommandHandler } from 'infrastructure/command/command-handler'
import { ExecuteSkillCommand } from './execute-skill.command'
import { SkillFactory } from './skill.factory'

export class ExecuteSkillHandler implements CommandHandler<ExecuteSkillCommand> {
  constructor(private readonly skillFactory: SkillFactory) {}

  public async execute(command: ExecuteSkillCommand): Promise<void> {
    const { from, to } = command
    await this.skillFactory.makeSkill(from.skill).execute(from, to)
  }
}
