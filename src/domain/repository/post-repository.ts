import Post from "../entities/post"

type WhereUniqueInput = {
  id?: string
}

type UpdateInput = {
  id?: string
  text?: string
  authorId?: string
}

export default interface PostRepository {
  save(data: Post): Promise<void>
  list(): Promise<Post[]>
  get(where: WhereUniqueInput): Promise<Post | null>
  check(where: WhereUniqueInput): Promise<boolean>
  update(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void>
  delete(where: WhereUniqueInput): Promise<void>
}