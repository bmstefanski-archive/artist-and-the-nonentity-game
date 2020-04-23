import { Creature } from 'creature/creature.model'

export interface SkillExecuter {
  execute(from: Creature, to: Creature): Promise<void>
}
