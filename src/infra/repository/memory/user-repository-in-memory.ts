import Post from "@/domain/entities/post";
import User from "@/domain/entities/user";
import UserRepository from "@/domain/repository/user-repository";

export type WhereInput = {
  id?: string | undefined
  email?: string | undefined
}

export type UpdateInput = {
  id?: string | undefined
  name?: string | undefined
  email?: string | undefined
  interests?: string[] | undefined
  posts?: Post[] | undefined
}

export default class UserRepositoryDatabaseInMemory implements UserRepository {
  users: User[]

  constructor() { }

  async save(data: User): Promise<void> {
    this.users = []
    data.createdAt = new Date(Date.now())
    data.updatedAt = new Date(Date.now())
    this.users.push(data)
  }

  async list(): Promise<User[]> {
    const users: User[] = [];
    for (const data of this.users) {
      users.push(new User(
        data.id,
        data.name,
        data.email,
        data.interests,
        undefined,
        data.createdAt,
        data.updatedAt
      ));
    }
    return users
  }

  async get(where: { id?: string, email?: string }): Promise<User | null> {
    let userFound
    if (where.id) {
      userFound = this.users.find((value) => value.id === where.id)
    } else {
      userFound = this.users.find((value) => value.email === where.email)
    }
    if (userFound)
      return new User(userFound.id, userFound.name, userFound.email, userFound.interests, userFound.posts, userFound.createdAt, userFound.updatedAt)
    return null
  }

  async check(where: WhereInput): Promise<boolean> {
    const user = this.users.find((value) => value.id === where.id)
    return user ? true : false
  }

  async update(params: { where: { id?: string, email?: string }, data: { name: string, email: string, interests: string[], posts: Post[] } }): Promise<void> {
    const { id, email } = params.where
    let userIndex
    if (id) {
      userIndex = this.users.findIndex((value) => value.id === id)
    } else {
      userIndex = this.users.findIndex((value) => value.email === email)
    }

    if (userIndex >= 0) {
      this.users[userIndex].name = params.data.name
      this.users[userIndex].email = params.data.email
      this.users[userIndex].interests = params.data.interests
      this.users[userIndex].posts = params.data.posts
      this.users[userIndex].updatedAt = new Date(Date.now())
    }
  }

  async delete(where: WhereInput): Promise<void> {
    const indexFound = this.users.findIndex((value) => value.id || value.email === where)
    this.users.splice(indexFound, 1)
  }

}