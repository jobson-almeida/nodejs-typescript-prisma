import RepositoryFactory from "@/domain/factory/repository-factory";
import UserRepository from "@/domain/repository/user-repository"
import InterestRepository from "@/domain/repository/interest-repository";
import User from "@/domain/entities/user";
import EmailExistsError from "@/infra/http/errors/email-exists";
import InactiveInterestError from "@/infra/http/errors/inactive-interest";
import NotFoundError from "@/infra/http/errors/not-found-error";

type Input = {
  id?: string
  name: string
  email: string
  interests: Array<string>
  //  posts?: Array<Post>
}

export default class SaveUser {
  userRepository: UserRepository
  interestRepository: InterestRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
    this.interestRepository = repositoryFactory.createInterestRepository();
  }

  async execute(data: Input): Promise<void> {
    const { id, name, email, interests } = data
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
    await this.userRepository.save(new User(id, name, email, interests))
  }
} 
