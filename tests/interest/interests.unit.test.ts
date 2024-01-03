import InvalidObjectError from "@/domain/entities/errors/invalid-object"
import Interest from "@/domain/entities/interest"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { randomUUID } from "crypto"
import { describe, test, expect } from "vitest"

describe("Interest unit", () => {
  test("Should create interest unit", () => {
    const input = {
      name: `interest ${randomUUID()}`,
      active: true
    }
    const interest = Interest.create(input.name, input.active)

    expect(interest.name).toEqual(input.name)
    expect(interest.active).toBeTruthy()
    expect(interest.id).not.toBeUndefined()
    expect(interest.createdAt).toBeUndefined()
    expect(interest.updatedAt).toBeUndefined()
  })

  test("Should not create interest unit with empty name", () => {
    const input = {
      name: "",
      active: true
    }
    expect(() => Interest.create(input.name, input.active)).toThrow(new InvalidObjectError("Invalid name field content: review name format"))
  })

  test("Should not create interest unit with double space in name", () => {
    const input = {
      name: "new  interest",
      active: true
    }
    expect(() => Interest.create(input.name, input.active)).toThrow(new InvalidObjectError("Invalid name field content: review name format"))
  })

})