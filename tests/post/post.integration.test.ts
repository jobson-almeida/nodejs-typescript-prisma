import { randomUUID } from "crypto";
import PostRepositoryDatabaseInMemory from "@/infra/repository/memory/post-repository-in-memory";
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter";
import PostRepositoryDatabase from "@/infra/repository/database/post-repository-database";
import { describe, test, expect } from "vitest"

function dataGenerate(): string {
  return randomUUID()
}

const prismaClientAdapter = new PrismaClientAdapter();
//const postRepository = new PostRepositoryDatabase(prismaClientAdapter)
const postRepository = new PostRepositoryDatabaseInMemory()
let id = ""

describe('Post integration', () => {

  test('Should save post', async () => {
    const input = {
      text: `text${dataGenerate()}`,
      authorId: "baf67b95-6345-4a40-bd4d-70402e8e6c4f" //dataGenerate()
    }
    await postRepository.save(input)
    const postsFound = await postRepository.list()
    const [post] = postsFound
    id = post.id

    expect(postsFound).not.toBeNull()
    expect(postsFound).toHaveLength(1)
    expect(post.text).toBe(input.text)
    expect(post.authorId).toBe(input.authorId)
  })

  test('Should check post exists', async () => {
    const existsPost = await postRepository.check({ id })
    expect(existsPost).toBeTruthy()
  })

  test('Should check post not exists', async () => {
    const existsPost = await postRepository.check({ id: "123456" })
    expect(existsPost).toBeFalsy()
  })

  test('Should get post', async () => {
    const postFound = await postRepository.get({ id })
    expect(postFound).not.toBeNull()
    expect(postFound?.id).toBe(id)
  })

  test('Should update post', async () => {
    const postFound = await postRepository.get({ id })
    const currentPost = {
      id: postFound?.id,
      text: postFound?.text,
      authorId: postFound?.authorId,
      updatedAt: postFound?.updatedAt,
    }
    const updatePost = {
      where: {
        id
      },
      data: {
        text: `text${dataGenerate()}`,
        authorId: "baf67b95-6345-4a40-bd4d-70402e8e6c4f" //dataGenerate()
      }
    }
    await postRepository.update(updatePost)
    const updatedPost = await postRepository.get({ id })

    expect(currentPost.text).not.toEqual(updatedPost?.text)
    expect(currentPost.updatedAt).not.toEqual(updatedPost?.updatedAt)
  });

  test('Should delete one post', async () => {
    await postRepository.delete({ id })
    const postFound = await postRepository.get({ id })
    expect(postFound).toBeNull()
  })

})