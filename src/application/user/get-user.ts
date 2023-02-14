import Post from "@/domain/entities/post";
import RepositoryFactory from "@/domain/factory/repository-factory";
import UserRepository from "@/domain/repository/user-repository"
import NotFoundError from "@/infra/http/errors/not-found-error";

type Output = {
  id?: string,
  name: string,
  email: string,
  interests: Array<string>,
  posts?: Array<Post>,
  createdAt?: Date,
  updatedAt?: Date
}

type WhereUniqueInput = {
  id?: string
  email?: string
}

export default class GetUser {
  userRepository: UserRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const userFound = await this.userRepository.get(where)
    if (!userFound) throw new NotFoundError("User not found")
    return {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      interests: userFound.interests,
      posts: userFound.posts,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    }
  }
}
