import { DataStorage } from './data-storage'
import { IdentifierNotFound } from './identifier-not-found.error'
import { InMemoryDataStorage } from './inmemory.data-storage'

describe('InMemoryDataStorage', () => {
  let storage: DataStorage

  beforeEach(() => {
    storage = new InMemoryDataStorage()
  })

  describe('save', () => {
    it('should push payload to the storage', async () => {
      storage.save({ id: 1, greetings: 'hi' })
      const allItems = await storage.findAll()

      expect(allItems).toHaveLength(1)
      expect(allItems[0]).toStrictEqual({ id: 1, greetings: 'hi' })
    })

    it('should replace item if already exists', async () => {
      storage.save({ id: 1, greetings: 'hi' })

      storage.save({ id: 1, greetings: 'howdy' })
      const allItems = await storage.findAll()

      expect(allItems).toHaveLength(1)
      expect(allItems[0]).toHaveProperty('greetings', 'howdy')
    })

    it('should throw an error if payload is falsy', () => {
      expect(() => storage.save(undefined)).toThrow(IdentifierNotFound)
    })

    it(`should throw an error if entity's id is falsy`, () => {
      expect(() => storage.save({ id: 0 })).toThrow(IdentifierNotFound)
    })
  })

  describe('findOne', () => {
    it('should filter and return item by id', async () => {
      storage.save({ id: 1, greetings: 'hi' })

      const result = await storage.findOne(1)

      expect(result).toHaveProperty('id', 1)
    })

    it('should throw an error if specified id is falsy', async () => {
      const findPromise = storage.findOne(undefined)
      await expect(findPromise).rejects.toThrow(IdentifierNotFound)
    })

    it('should return undefined if passed id does not belong to any item', async () => {
      const result = await storage.findOne(1)

      expect(result).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should remove item with specified id from store', async () => {
      storage.save({ id: 1, greetings: 'howdy' })

      storage.delete(1)

      const findAllPromise = await storage.findAll()
      expect(findAllPromise).toHaveLength(0)
    })

    it('should throw an error if specified id is falsy', () => {
      expect(() => storage.delete(undefined)).toThrowError(IdentifierNotFound)
    })
  })

  describe('findAll', () => {
    it('should return immutable copy of storage', async () => {
      storage.save({ id: 1, greetings: 'howdy' })
      storage.save({ id: 2, greetings: 'hi' })

      const results = await storage.findAll()
      results[0].id = 999
      const resultsAfterMutation = await storage.findAll()

      expect(results).toHaveLength(2)
      expect(resultsAfterMutation[0]).toHaveProperty('id', 1)
    })
  })
})
