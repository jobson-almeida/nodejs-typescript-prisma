import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository"
import UserRepository from "@/domain/repository/user-repository";
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id: string
}

export type UpdateInput = {
  id?: string
  text: string
  authorId: string
}

export default class UpdatePost {
  postRepository: PostRepository
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = this.repositoryFactory.createPostRepository()
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id } = params.where
    const { text, authorId } = params.data
    
    const postFound = await this.postRepository.get({ id })
    if (!postFound) throw new NotFoundError("Post not found")
    
    const authorFound = await this.userRepository.check({ id: authorId })
    if (!authorFound) throw new NotFoundError("Author not found")
    
    postFound.build(text, authorId)
    const post = {text: postFound.text, authorId: postFound.author.id}

    await this.postRepository.update({
      where: params.where,
      data: post
    })
  }
}
