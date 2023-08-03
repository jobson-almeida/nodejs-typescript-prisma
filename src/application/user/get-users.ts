import User from "@/domain/entities/user";
import RepositoryFactory from "@/domain/factory/repository-factory";
import UserRepository from "@/domain/repository/user-repository";

type Output = {
  id: string,
  name: string,
  email: string,
  interests: string[],
  createdAt: Date,
  updatedAt: Date
}

export default class GetUsers {
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(): Promise<Output[]> {
    const usersFound = await this.userRepository.list();

    const users: User[] = []
    for (const data of usersFound) {
      users.push(new User(data.id, data.name, data.email, data.interests, undefined, data.createdAt, data.updatedAt))
    }

    return users.map(user => (
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