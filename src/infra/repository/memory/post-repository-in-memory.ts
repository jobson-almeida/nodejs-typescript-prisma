import PostRepository from "@/domain/repository/post-repository";
import { randomUUID } from "crypto";

type Post = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}

type WhereInput = {
  id?: string | undefined
  text?: string
}

type UpdateInput = {
  id?: string | undefined
  text?: string | undefined
  authorId?: string | undefined
}

type Input = {
  id?: string | undefined
  text: string
  authorId: string
}

export default class PostRepositoryDatabaseInMemory implements PostRepository {
  post: Post
  posts: Post[]

  constructor() { }

  async save(input: Input): Promise<void> {
    this.posts = [
      {
        id: randomUUID(),
        text: input.text,
        authorId: input.authorId,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ]
  }

  async list(): Promise<Post[]> {
    return this.posts
  }

  async check(where: WhereInput): Promise<boolean> {
    const postFound = this.posts.find((value) => value.id === where.id)
    return postFound ? true : false
  }

  async get(where: WhereInput): Promise<Post | null> {
    const post = this.posts.find((value) => value.id === where.id)
    return post ?? null
  }

  async update(params: { where: WhereInput, data: UpdateInput }): Promise<void> {
    const indexFound = this.posts.findIndex((value) => value.id === params.where.id)
    if (indexFound >= 0) {
      if (params.data.text) this.posts[indexFound].text = params.data.text
      if (params.data.authorId) this.posts[indexFound].authorId = params.data.authorId
      this.posts[indexFound].updatedAt = new Date(Date.now())
    }
  }

  async delete(where: WhereInput): Promise<void> {
    const indexFound = this.posts.findIndex((value) => value.id === where.id)
    this.posts.splice(indexFound, 1)
  }
}