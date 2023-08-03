import RepositoryFactory from "@/domain/factory/repository-factory";
import InterestRepository from "@/domain/repository/interest-repository";
import UserRepository from "@/domain/repository/user-repository"
import EmailExistsError from "@/infra/http/errors/email-exists";
import InactiveInterestError from "@/infra/http/errors/inactive-interest";
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id?: string
  email?: string
}

export type UpdateInput = {
  id?: string
  name: string
  email: string
  interests: string[]
}

export default class UpdateUser {
  userRepository: UserRepository
  interestRepository: InterestRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
    this.interestRepository = this.repositoryFactory.createInterestRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id } = params.where
    const { name, email, interests } = params.data
    const userFoundFromId = await this.userRepository.get({id})
    const userFoundFromEmail = await this.userRepository.get({email})
    if (userFoundFromEmail?.email === email && userFoundFromEmail?.id !== id) throw new EmailExistsError()
    if (userFoundFromEmail?.interests && userFoundFromEmail?.interests.length > 0) {
      for (let id of userFoundFromEmail.interests) {
        const interestFound = await this.interestRepository.get({ id })
        if (!interestFound) throw new NotFoundError("Interest not found")
        if (interestFound.active === false) throw new InactiveInterestError()
      }
    }
    
    userFoundFromId &&
      userFoundFromId.build(name, email, interests) 
      const user = { 
        name: userFoundFromId?.name,
        email: userFoundFromId?.email,
        interests: userFoundFromId?.interests
      }
      await this.userRepository.update({ where: params.where, data: user })
  }
}
