import InvalidObjectError from "@/domain/entities/errors/invalid-object"
import Interest from "@/domain/entities/interest"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { randomUUID } from "crypto"
import { describe, test, expect } from "vitest"

type Input = {
  name: string
  active: any
}

function dataGenerate(): string {
  return randomUUID()
}

function createNewInterest(data: Input): Interest {
  const date = new Date(Date.now())
  const interest = new Interest(
    dataGenerate(),
    data.name,
    data.active,
    date,
    date
  )
  return interest
}

describe.skip("Interest unit", () => {
  test("Should create interest", () => {
    const input = {
      name: `interest ${dataGenerate()}`,
      active: true
    }
    const interest = createNewInterest(input)
    expect(interest.name).toEqual(input.name)
    expect(interest.active).toBeTruthy()
    expect(interest.createdAt).toBeInstanceOf(Date)
    expect(interest.updatedAt).toBeInstanceOf(Date)
  })

  test("Should not create user with invalid name", () => {
    const input = {
      name: "",
      active: true
    }
    expect(() => createNewInterest(input)).toThrow(new InvalidObjectError("Invalid name field content: set a name"))
  })

  test("Should not create user with invalid active status", async () => {
    const input = {
      name: `interest ${dataGenerate()}`,
      active: "true"
    }
    expect(() => createNewInterest(input)).toThrow(new InvalidObjectError("Invalid active field content: set true or false"))
  })

})