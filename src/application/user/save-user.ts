import RepositoryFactory from "@/domain/factory/repository-factory";
import UserRepository from "@/domain/repository/user-repository"
import InterestRepository from "@/domain/repository/interest-repository";
import User from "@/domain/entities/user";
import EmailExistsError from "@/infra/http/errors/email-exists";
import InactiveInterestError from "@/infra/http/errors/inactive-interest";
import NotFoundError from "@/infra/http/errors/not-found-error";
import Post from "@/domain/entities/post";

type Input = { 
  name: string
  email: string
  interests: string[] 
  posts: Post[]
}

export default class SaveUser {
  userRepository: UserRepository
  interestRepository: InterestRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
    this.interestRepository = this.repositoryFactory.createInterestRepository();
  }

  async execute(data: Input): Promise<void> {
    const { name, email, interests } = data
    const existsEmail = await this.userRepository.check({ email })
    if (existsEmail) throw new EmailExistsError()
    if (data.interests && data.interests.length > 0) {
      const interestsFound = await this.interestRepository.list(interests)
      if (interestsFound.length < data.interests?.length) throw new NotFoundError("Interest not found")
      if (interestsFound && interestsFound.length > 0) {
        for (let interest of interestsFound) {
          if (interest.active === false) throw new InactiveInterestError()
        }
      }
    }
    const user = User.create(name, email, interests)
    await this.userRepository.save(user)
  }
} 
