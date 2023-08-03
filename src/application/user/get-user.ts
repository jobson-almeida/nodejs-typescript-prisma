import User from "@/domain/entities/user";
import RepositoryFactory from "@/domain/factory/repository-factory";
import UserRepository from "@/domain/repository/user-repository"
import NotFoundError from "@/infra/http/errors/not-found-error";

type Output = {
  id: string,
  name: string,
  email: string,
  interests: string[],
  posts: {
    id: string
    text: string
    createdAt: Date
    updatedAt: Date
  }[]
  createdAt: Date,
  updatedAt: Date
}

type WhereUniqueInput = {
  id?: string
  email?: string
}

export default class GetUser {
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const userFound = await this.userRepository.get(where)

    if (!userFound) throw new NotFoundError("User not found")
    const user: User = new User(
      userFound.id,
      userFound.name,
      userFound.email,
      userFound.interests,
      userFound.posts,
      userFound.createdAt,
      userFound.updatedAt
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      interests: user.interests,
      posts: user.posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
