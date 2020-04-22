import { DataStorage } from './data-storage'

export class InMemoryDataStorage implements DataStorage {
  private storage = []

  public save<T extends { id: number }>(payload: T): unknown {
    this.storage.push(payload)
    return payload
  }

  public async findOne<T extends { id: number }>(id: number): Promise<T> {
    return this.storage.find((item) => item.id === id)
  }

  public delete(...ids: number[]): void {
    ids.forEach((id) => this.deleteOne(id))
  }

  private deleteOne(id: number): void {
    this.storage = this.storage.filter((item) => item.id !== id)
  }
}
