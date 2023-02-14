import InvalidObjectError from "@/domain/entities/errors/invalid-object";
import InvalidUUIDError from "@/domain/entities/errors/invalid-uuid";
import Post from "@/domain/entities/post";
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

type Input = {
  text: string
  authorId: string
}

function dataGenerate(): string {
  return randomUUID()
}

function createNewPost(data: Input): Post {
  const date = new Date(Date.now())
  const post = new Post(
    dataGenerate(),
    data.text,
    data.authorId,
    date,
    date
  )
  return post
}

describe.skip("Post unit", () => {

  test("Should create post", () => {
    const input = {
      text: "text",
      authorId: dataGenerate()
    }
    const post = createNewPost(input)

    expect(post.id).toEqual(expect.stringMatching(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi))
    expect(post.text).toEqual(input.text)
    expect(post.authorId).toEqual(input.authorId)
    expect(post.createdAt).toBeInstanceOf(Date)
    expect(post.updatedAt).toBeInstanceOf(Date)
  })

  test("Should not create post with invalid text", () => {
    const input = {
      text: "",
      authorId: "1"
    }
    expect(() => createNewPost(input)).toThrow(new InvalidObjectError("Invalid text field content: set a text"))
  })

  test("Should not create post with invalid author", () => {
    const input = {
      text: "text",
      authorId: "1"
    }
    expect(() => createNewPost(input)).toThrow(new InvalidUUIDError("Invalid author field content: set a valid author"))
  })
})