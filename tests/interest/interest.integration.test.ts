import InterestRepositoryDatabaseInMemory from "@/infra/repository/memory/interest-repository-in-memory";
import { randomUUID } from "crypto";
import { describe, test } from "vitest"


const dataGenerate = (): string => {
  return randomUUID()
}

const interestRepository = new InterestRepositoryDatabaseInMemory();

let id = ""
let name = ""
let active = true

describe('Integration test', () => {

  test('It should create an interest', async () => {
    const input = {
      name: `name ${dataGenerate()}`,
      active: true
    };

    const existsInterest = await interestRepository.check({ name: input.name })
    if (!existsInterest) console.log(existsInterest)

  });

});