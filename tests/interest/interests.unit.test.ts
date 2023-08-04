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

describe("Interest unit", () => {
  test("Should create interest unit", () => {
    const input = {
      name: `interest ${dataGenerate()}`,
      active: true
    }
    const interest = Interest.create(input.name, input.active) 
    expect(interest.name).toEqual(input.name)
    expect(interest.active).toBeTruthy()
    expect(interest.id).not.toBeUndefined()
    expect(interest.createdAt).toBeUndefined()
    expect(interest.updatedAt).toBeUndefined()
  })
 
})