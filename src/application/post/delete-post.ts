import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository";
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id: string
}

export default class DeletePost {
  postRepository: PostRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = this.repositoryFactory.createPostRepository()
  }

  async execute(where: WhereUniqueInput): Promise<void> {
    const postFound = await this.postRepository.check(where)
    if (!postFound) throw new NotFoundError("Post not found")
    await this.postRepository.delete(where)
  }
} 
