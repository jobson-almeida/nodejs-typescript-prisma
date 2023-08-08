import Interest from "@/domain/entities/interest";
import InterestRepositoryDatabaseInMemory from "@/infra/repository/memory/interest-repository-in-memory";
import { randomUUID } from "crypto";
import { beforeAll, describe, expect, test } from "vitest"


const dataGenerate = (): string => {
  return randomUUID()
}

const interestRepository = new InterestRepositoryDatabaseInMemory();

let id = ""
let name = ""
let active = true

describe('Integration test', () => {

  beforeAll(async () => {
    const interests: Interest[] = await interestRepository.list()
    if (interests) {
      for (let data of interests) {
        await interestRepository.delete({ id: data.id })
      }
    }
  })

  test('It should check, create and list an interest', async () => {
    const input = {
      name: `name ${dataGenerate()}`,
      active: true
    };

    const existsInterest = await interestRepository.check({ name: input.name })
    let newInterest: Interest

    if (!existsInterest) {
      newInterest = Interest.create(input.name, input.active)
      await interestRepository.save(newInterest)
    }
    const interestsFound = await interestRepository.list()
    const [interest] = interestsFound
    id = interest.id
    name = interest.name
    active = false

    expect(existsInterest).toBeFalsy()
    expect(interestsFound).not.toBeNull()
    expect(interestsFound).toHaveLength(1)
    expect(input.name).toBe(interest.name);
    expect(input.active).toBe(interest.active);
  })

  test('Must check non-existent record id', async () => {
    const existsInterest = await interestRepository.check({ id: "123456" })
    expect(existsInterest).toBeFalsy()
  })

  test('Must check non-existent record name', async () => {
    const existsInterest = await interestRepository.check({ name: "new interest" })
    expect(existsInterest).toBeFalsy()
  })

  test('Should get interest from id', async () => {
    const interestFound = await interestRepository.get({ id })
    expect(interestFound).not.toBeNull()
    expect(interestFound?.id).toEqual(id)
  })

  test('Should not get interest from invalid id or not found', async () => {
    const interestFound = await interestRepository.get({ id: "invalid or non-existent ID" })
    expect(interestFound).toBeNull()
  })

  test('Should get an interest from name', async () => {
    const interestFound = await interestRepository.get({ name })
    expect(interestFound).not.toBeNull()
    expect(interestFound?.name).toEqual(name)
  })

  test('Should not get interest from name valid non-existent', async () => {
    const interestFound = await interestRepository.get({ name: "non-existent name" })
    expect(interestFound).toBeNull()
  })

  test('Should update an interest from id', async () => {
    const interestFromId = await interestRepository.get({ id })
    const interestFromName = await interestRepository.get({ name })
    const existsInterest = interestFromId?.id !== interestFromName?.id

    if (interestFromId && !existsInterest) {
      interestFromId.build(`name ${dataGenerate()}`, false)

      const interest = { name: interestFromId.name, active: interestFromId.active }

      await interestRepository.update({
        where: { id },
        data: interest
      })

      const updatedInterest = await interestRepository.get({ id })

      expect(existsInterest).toBeFalsy()
      expect(interestFromId).not.toBeNull()
      expect(updatedInterest?.name).toBe(interest.name);
      expect(updatedInterest?.active).toBe(interest.active);
      expect(interestFromName?.name).not.toBe(interest.name);
      expect(interestFromName?.active).not.toBe(interest.active);
    }
  })

  test('Should delete interest from id', async () => {
    await interestRepository.delete({ id })
    const deletedInterest = await interestRepository.get({ id })
    expect(deletedInterest).toBeNull()
  })

});

