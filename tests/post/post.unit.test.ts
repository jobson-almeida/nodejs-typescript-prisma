import InvalidObjectError from "@/domain/entities/errors/invalid-object";
import Post from "@/domain/entities/post";
import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";


describe("Post unit", () => {
    let text = ""
    let authorId = ""
    let post: Post

    test("Should create post", () => {
        const input = {
            text: `text ${randomUUID()}`,
            authorId: `${randomUUID()}`
        }

        post = Post.create(input.text, input.authorId)
        text = post.text
        authorId = post.authorId

        expect(post).not.toBeNull()
        expect(post.id).toBeDefined()
        expect(input.text).toEqual(post.text)
        expect(input.authorId).toEqual(post.authorId)
    })

    test("Should update post", () => {
        const input = {
            text: `text ${randomUUID()}`,
            authorId: `${randomUUID()}`
        }

        post.build(input.text, input.authorId)
        expect(input.text).not.toEqual(text)
        expect(input.authorId).not.toEqual(authorId)
    })

    test("Should not create post from empty text", () => {
        const input = {
            text: "",
            authorId: `${randomUUID()}`
        }

        expect(() => Post.create(input.text, input.authorId)).toThrow(new InvalidObjectError("Invalid text field content: set a text"))
    })

})