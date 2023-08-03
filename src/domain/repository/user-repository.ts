import User from "../entities/user"

type WhereUniqueInput = {
  id?: string
  email?: string
}

type UpdateInput = {
  name?: string
  email?: string
  interests?: string[] 
}

export default interface UserRepository {
  save(data: User): Promise<void>
  list(): Promise<User[]>
  get(where: WhereUniqueInput): Promise<User | null>
  check(where: WhereUniqueInput): Promise<boolean>
  update(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void>
  delete(where: WhereUniqueInput): Promise<void>
}
