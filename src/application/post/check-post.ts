import RepositoryFactory from "@/domain/factory/repository-factory"
import PostRepository from "@/domain/repository/post-repository"

type WhereUniqueInput = {
  id?: string
}

export default class CheckPostId {
  postRepository: PostRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = repositoryFactory.createPostRepository()
  }

  async execute(where: WhereUniqueInput): Promise<boolean> {
    return await this.postRepository.check(where)
  }
}
