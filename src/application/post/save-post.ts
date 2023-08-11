import Post from "@/domain/entities/post"
import User from "@/domain/entities/user"
import RepositoryFactory from "@/domain/factory/repository-factory"
import PostRepository from "@/domain/repository/post-repository"
import UserRepository from "@/domain/repository/user-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type Input = {
  text: string
  authorId: string 
}

export default class SavePost { 
  postRepository: PostRepository
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = this.repositoryFactory.createPostRepository()
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(data: Input): Promise<void> {
    const { text, authorId} = data
    const post = Post.create(text, authorId)
    const authorFound = await this.userRepository.check({ id: authorId })
    if (!authorFound) throw new NotFoundError("Author not found")
    await this.postRepository.save(post)
  }
}
