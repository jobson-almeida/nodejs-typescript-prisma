import Post from "../entities/post"
import User from "../entities/user"

type WhereUniqueInput = {
  id?: string
  email?: string
}

type UpdateInput = {
  id?: string
  name?: string
  email?: string
  interests?: Array<string>
}

type Users = {
  id?: string,
  name: string,
  email: string,
  interests: Array<string>,
  // posts?: Array<Post>,
  createdAt?: Date,
  updatedAt?: Date
}

export default interface UserRepository {
  save(data: Users): Promise<void>
  list(): Promise<User[]>
  get(where: WhereUniqueInput): Promise<User | null>
  check(where: WhereUniqueInput): Promise<boolean>
  update(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void>
  delete(where: WhereUniqueInput): Promise<void>
}
