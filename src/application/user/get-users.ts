import RepositoryFactory from "@/domain/factory/repository-factory";
import UserRepository from "@/domain/repository/user-repository";

type Output = {
  id?: string,
  name: string,
  email: string,
  interests: Array<string>,
  createdAt?: Date,
  updatedAt?: Date
}

export default class GetUsers {
  userRepository: UserRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(): Promise<Output[]> {
    const usersFound = await this.userRepository.list();
    return usersFound.map(user => (
      {
        id: user.id,
        name: user.name,
        email: user.email,
        interests: user.interests,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    ))
  }
}