import { CreatureModule } from 'creature'
import { CommandBus } from 'infrastructure/command/command.bus'
import { EventBus } from 'infrastructure/event/event.bus'
import { SimpleEventBus } from 'infrastructure/event/simple-event.bus'
import { Module } from 'infrastructure/module/module'
import { DataStorage } from 'infrastructure/storage/data-storage'
import { InMemoryDataStorage } from 'infrastructure/storage/inmemory.data-storage'
import { SkillModule } from 'skill'

async function bootstrap(): Promise<void> {
  const globalEventBus: EventBus = new SimpleEventBus()
  const globalCommandBus = new CommandBus()
  const storage: DataStorage = new InMemoryDataStorage()

  initializeModulesComponents(
    new CreatureModule(storage, globalEventBus, globalCommandBus),
    new SkillModule(globalEventBus, globalCommandBus),
  )

  process.stdin.resume()
}

function initializeModulesComponents(...module: Module[]): void {
  module.forEach((element) => {
    element.initializeCommands()
    element.initializeEvents()
  })
}

bootstrap()
