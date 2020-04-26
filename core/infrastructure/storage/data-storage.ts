type Identifiable = { id: number }

export interface DataStorage {
  save<T extends Identifiable>(payload: T): unknown
  findOne<T extends Identifiable>(id: number): Promise<T>
  delete(...ids: number[]): void
  findAll<T extends Identifiable>(): Promise<T[]>
}
