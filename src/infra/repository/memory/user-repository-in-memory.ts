import User from "@/domain/entities/user";
import UserRepository from "@/domain/repository/user-repository";
import { randomUUID } from "crypto";

/*
export type User = {
  id: string
  name: string
  email: string
  interests: Array<string>
  posts?: Post[] | undefined
  createdAt: Date
  updatedAt: Date
}

export type WhereInput = {
  id?: string | undefined
  email?: string | undefined
}

export type UpdateInput = {
  id?: string | undefined
  name?: string | undefined
  email?: string | undefined
  posts?: Post[] | undefined
  interests?: Array<string> | undefined
}

export type Input = {
  id?: string | undefined
  name: string
  email: string
  interests?: Array<string> | undefined
}

export type Post = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}
*/

export default class UserRepositoryDatabaseInMemory implements UserRepository {
 // user: User
  users: User[]
//  post: Post
 // posts: Post[]

  constructor() { }

  async save(data: User): Promise<void> {
    this.users = []
    data.createdAt = new Date(Date.now())
    data.updatedAt = new Date(Date.now())
    this.users.push(data)
  }

  /*
  async list(): Promise<User[]> {
    return this.users
  }

  async get(where: WhereInput): Promise<User | null> {
    const user = this.users.find((value) => value.id || value.email === where)

    if (where.id) {
      this.posts = [{
        id: randomUUID(),
        text: "first post",
        authorId: where.id,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }]
      const user_posts = this.posts.find((value) => value.authorId === where)
      if (user_posts) user?.posts?.push(user_posts)
    }
    return user ?? null
  }

  async check(where: WhereInput): Promise<boolean> {
    const user = this.users.find((value) => value.id === where.id)
    return user ? true : false
  }

  async update(params: {
    where: WhereInput,
    data: UpdateInput
  }
  ): Promise<void> {
    const indexFound = this.users.findIndex((value) => value.id === params.where.id)
    if (indexFound >= 0) {
      if (params.data.name) this.users[indexFound].name = params.data.name
      if (params.data.email) this.users[indexFound].email = params.data.email
      this.users[indexFound].interests = params.data.interests || []
      this.users[indexFound].updatedAt = new Date(Date.now())
    }
  }

  async delete(where: WhereInput): Promise<void> {
    const indexFound = this.users.findIndex((value) => value.id || value.email === where)
    this.users.splice(indexFound, 1)
  }
  */
}