import Post from "@/domain/entities/post"
import RepositoryFactory from "@/domain/factory/repository-factory"
import PostRepository from "@/domain/repository/post-repository"
import UserRepository from "@/domain/repository/user-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type Input = {
  id?: string
  text: string
  authorId: string
}

export default class SavePost {
  postRepository: PostRepository
  userRepository: UserRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = repositoryFactory.createPostRepository()
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(data: Input): Promise<void> {
    const { id, text, authorId } = data
    const authorFound = await this.userRepository.check({ id: authorId })
    if (!authorFound) throw new NotFoundError("Author not found")
    await this.postRepository.save(new Post(id, text, authorId))
  }
}
