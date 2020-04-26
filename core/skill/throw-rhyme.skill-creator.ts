import { CreatureUpdatedEvent } from 'creature/creature-updated.event'
import { CreatureDto } from 'creature/dto/creature.dto'
import { UpdateCreatureCommand } from 'creature/update-creature.command'
import { Event } from 'infrastructure/event/event.marker'
import { Subscription } from 'infrastructure/event/subscription.type'
import { floor } from 'lodash'
import { SkillCreator } from './skill-creator'

export class ThrowRhymeSkillCreator extends SkillCreator {
  private static readonly SKILL_DURATION_SEC = 1000 * 10
  private static readonly CRITICAL_HIT_PERCENT = 20

  protected async executeSkill(from: CreatureDto, to: CreatureDto): Promise<void> {
    if (this.isAlive(from) && this.isAlive(to)) {
      const subscription = this.multiplyPowerPointsWhenGetsCriticalHit(from, to)
      setTimeout(() => this.eventBus.unsubscribe(subscription), ThrowRhymeSkillCreator.SKILL_DURATION_SEC)
    }
  }

  private isAlive(creature: CreatureDto): boolean {
    return creature && (creature.health > 0 || creature.lives > 0)
  }

  private multiplyPowerPointsWhenGetsCriticalHit(victim: CreatureDto, attacker: CreatureDto): Subscription {
    const subscription = this.eventBus.subscribe((event: Event) => {
      if (event instanceof CreatureUpdatedEvent && event.id === victim.id) {
        const currentHealth = event.updatedProperties.health
        const damageValue = this.getDamageValue(victim.health, currentHealth)

        if (this.isAttackCritical(currentHealth, damageValue)) {
          const payload = { health: attacker.health - this.multiplyBy(damageValue, 2) }
          this.commandBus.execute(new UpdateCreatureCommand(attacker.id, payload))
        }
      }
    })

    return subscription
  }

  private getDamageValue(originalHealthPoints: number, currentHealthPoints: number): number {
    return originalHealthPoints - currentHealthPoints
  }

  private isAttackCritical(healthPoints: number, damageValue: number): boolean {
    const damagePercentage = this.getPercentOf(damageValue, healthPoints)
    return damagePercentage >= ThrowRhymeSkillCreator.CRITICAL_HIT_PERCENT
  }

  private getPercentOf(value: number, totalValue: number): number {
    return floor((value / totalValue) * 100, 2)
  }

  private multiplyBy(value: number, numberToRoundDownTo: number): number {
    return floor(value * 2, numberToRoundDownTo)
  }
}
