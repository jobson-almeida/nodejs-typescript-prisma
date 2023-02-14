import Post from "@/domain/entities/post";
import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository"
import UserRepository from "@/domain/repository/user-repository";
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id?: string
}

export type UpdateInput = {
  id?: string
  text: string
  authorId: string
}

export default class UpdatePost {
  postRepository: PostRepository
  userRepository: UserRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = repositoryFactory.createPostRepository()
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id, text, authorId } = params.data
    const postFound = await this.postRepository.check({ id: params.where.id })
    if (!postFound) throw new NotFoundError("Post not found")
    const authorFound = await this.userRepository.check({ id: authorId })
    if (!authorFound) throw new NotFoundError("Author not found")
    await this.postRepository.update({
      where: params.where,
      data: new Post(id, text, authorId)
    })
  }
}
