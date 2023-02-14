import { randomUUID } from "crypto";
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter";
import InterestRepositoryDatabase from "@/infra/repository/database/interest-repository-database";
import InterestRepositoryDatabaseInMemory from "@/infra/repository/memory/interest-repository-in-memory";
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
}

const prismaClientAdapter = new PrismaClientAdapter();
const interestRepository = new InterestRepositoryDatabaseInMemory();
//const interestRepository = new InterestRepositoryDatabase(prismaClientAdapter);
let id = ""

describe.skip('interest', () => {

  test('Should save interest', async () => {
    const input = {
      name: `name ${dataGenerate()}`,
      active: true
    }
    await interestRepository.save(input)
    const interestsFound = await interestRepository.list()
    const [interest] = interestsFound
    id = interest.id

    expect(interestsFound).not.toBeNull()
    expect(interestsFound).toHaveLength(1)
    expect(input.name).toBe(interest.name);
    expect(input.active).toBe(interest.active);
  });


  test('Should check interest exists', async () => {
    const existsInterest = await interestRepository.check({ id })
    expect(existsInterest).toBeTruthy()
  })

  test('Should check interest not exists', async () => {
    const existsInterest = await interestRepository.check({ id: "123456" })
    expect(existsInterest).toBeFalsy()
  })

  test('Should get interest', async () => {
    const interestFound = await interestRepository.get({ id })
    expect(interestFound).not.toBeNull()
    expect(interestFound?.id).toBe(id)
  });

  test('Should update interest', async () => {
    const data = await interestRepository.get({ id })
    const currentInterest = {
      id: data?.id,
      name: data?.name,
      active: data?.active
    }
    await interestRepository.update({
      where: { id },
      data: {
        name: `name ${dataGenerate()}`,
        active: true
      }
    })
    const updatedInterest = await interestRepository.get({ id })
    expect(currentInterest?.name).not.toBe(updatedInterest?.name)
  });

  test("Should delete interest", async () => {
    await interestRepository.delete({ id })
    const existsInterest = await interestRepository.check({ id })
    expect(existsInterest).toBeFalsy()
  })

});