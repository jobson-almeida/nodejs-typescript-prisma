import Post from "@/domain/entities/post";
import PostRepository from "@/domain/repository/post-repository";

type WhereInput = {
  id: string
}

type UpdateInput = {
  id?: string | undefined
  text?: string | undefined
  authorId?: string | undefined
}

export default class PostRepositoryDatabaseInMemory implements PostRepository {
  posts: Post[]

  constructor() { }

  async save(data: Post): Promise<void> {
    this.posts = []
    data.createdAt = new Date(Date.now())
    data.updatedAt = new Date(Date.now())
    this.posts.push(data)
  }

  async list(): Promise<Post[]> {
    const posts: Post[] = [];
    for (const data of this.posts) {
      posts.push(new Post(
        data.id,
        data.text,
        data.authorId,
        data.createdAt,
        data.updatedAt
      ));
    }
    return posts
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