import Post from "@/domain/entities/post";
import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository"
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id: string
}

type Output = {
  id: string,
  text: string,
  createdAt: Date,
  updatedAt: Date,
  author: {
    id: string,
    name: string
    email: string
    interests: string[]
    createdAt: Date
    updatedAt: Date
  }
}

export default class GetPost {
  postRepository: PostRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = this.repositoryFactory.createPostRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const postFound = await this.postRepository.get(where)
    if (!postFound) throw new NotFoundError("Post not found")
    const post: Post = new Post(postFound.id, postFound.text, undefined, postFound.createdAt, postFound.updatedAt, postFound.author)

    return {
      id: post.id,
      text: post.text,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author
    }
  }
}