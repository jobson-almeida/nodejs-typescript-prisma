import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository"
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id?: string
}

type Output = {
  id?: string,
  text: string,
  authorId: string,
  createdAt?: Date,
  updatedAt?: Date
}

export default class GetPost {
  postRepository: PostRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = repositoryFactory.createPostRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const postFound = await this.postRepository.get(where)
    if (!postFound) throw new NotFoundError("Post not found")
    return {
      id: postFound.id,
      text: postFound.text,
      authorId: postFound.authorId,
      createdAt: postFound.createdAt,
      updatedAt: postFound.updatedAt
    }
  }
}