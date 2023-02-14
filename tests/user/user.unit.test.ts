import InvalidEmailError from "@/domain/entities/errors/invalid-email";
import InvalidObjectError from "@/domain/entities/errors/invalid-object";
import InvalidUUIDError from "@/domain/entities/errors/invalid-uuid";
import Post from "@/domain/entities/post";
import User from "@/domain/entities/user";
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

type Input = {
  name: string
  email: string
  interests: Array<string>
  posts?: Array<Post> | []
}

function dataGenerate(): string {
  return randomUUID()
}

function createNewUser(data: Input): User {
  const date = new Date(Date.now())
  const user = new User(
    dataGenerate(),
    data.name,
    data.email,
    data.interests,
    data?.posts,
    date,
    date
  )
  return user
}

describe.skip("User unit tests", () => {

  test("Should create user", () => {
    const input = {
      name: "name",
      email: "email@email.com",
      interests: [dataGenerate(), dataGenerate()]
    }
    const user = createNewUser(input)

    expect(user.id).toEqual(expect.stringMatching(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi))
    expect(user.name).toEqual(input.name)
    expect(user.email).toEqual(input.email)
    expect(user.interests).toEqual(input.interests)
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.updatedAt).toBeInstanceOf(Date)
  })

  test("Should not create user with invalid name", () => {
    const input = {
      name: "",
      email: "email@email.com",
      interests: [dataGenerate(), dataGenerate()]
    }
    expect(() => createNewUser(input)).toThrow(new InvalidObjectError("Invalid name field content: set a name"))
  })

  test("Should not create user with invalid email", () => {
    const input = {
      name: "name",
      email: "emailemail.com",
      interests: [dataGenerate(), dataGenerate()]
    }
    expect(() => createNewUser(input)).toThrow(new InvalidEmailError())
  })

  test("Should not create user with invalid interest", () => {
    const input = {
      name: "name",
      email: "email@email.com",
      interests: ["62028bea", dataGenerate()]
    }
    expect(() => createNewUser(input)).toThrow(new InvalidUUIDError("Invalid interest"))
  })
})