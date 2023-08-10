import Post from "@/domain/entities/post";
import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";


describe("Post unit", () => {
    let text = ""
    let authorId = ""
    let post:Post

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
})