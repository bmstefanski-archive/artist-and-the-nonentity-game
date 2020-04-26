import { cloneDeep } from 'lodash'
import { DataStorage } from './data-storage'
import { IdentifierNotFound } from './identifier-not-found.error'

export class InMemoryDataStorage implements DataStorage {
  private static readonly NOT_FOUND_INDEX: number = -1
  private storage = []

  public save<T extends { id: number }>(payload: T): unknown {
    this.ensureIdentifierIsValid(payload ? payload.id : null)
    const itemIndex = this.findIndexById(payload.id)

    if (itemIndex !== InMemoryDataStorage.NOT_FOUND_INDEX) {
      return this.mergeItems(itemIndex, payload)
    }

    this.storage.push(payload)
    return payload
  }

  private findIndexById(id: number): number {
    this.ensureIdentifierIsValid(id)
    return this.storage.findIndex((item) => item.id === id)
  }

  private mergeItems(itemIndex: number, payload: any): any {
    const updatedItem = { ...this.storage[itemIndex], ...payload }
    this.storage[itemIndex] = updatedItem
    return updatedItem
  }

  public async findOne<T extends { id: number }>(id: number): Promise<T> {
    this.ensureIdentifierIsValid(id)
    return this.storage.find((item) => item.id === id)
  }

  public delete(...ids: number[]): void {
    ids.forEach((id) => this.deleteOne(id))
  }

  private deleteOne(id: number): void {
    this.ensureIdentifierIsValid(id)
    this.storage = this.storage.filter((item) => item.id !== id)
  }

  public async findAll<T extends { id: number }>(): Promise<T[]> {
    return cloneDeep(this.storage)
  }

  private ensureIdentifierIsValid(id: number): void {
    if (!id) {
      throw new IdentifierNotFound()
    }
  }
}
