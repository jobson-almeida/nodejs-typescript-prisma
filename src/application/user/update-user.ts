import User from "@/domain/entities/user";
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
  interests: Array<string>
  //  posts?: Array<Post>
  createdAt?: string
  updatedAt?: string
}

export default class UpdateUser {
  userRepository: UserRepository
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository()
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id } = params.where
    const { name, email, interests } = params.data
    const userFound = await this.userRepository.get({ email })
    if (userFound?.email === email && userFound?.id !== id) throw new EmailExistsError()
    if (userFound?.interests && userFound?.interests.length > 0) {
      for (let id of userFound.interests) {
        const interestFound = await this.interestRepository.get({ id })
        if (!interestFound) throw new NotFoundError("Interest not found")
        if (interestFound.active === false) throw new InactiveInterestError()
      }
    }
    await this.userRepository.update({ where: params.where, data: new User(id, name, email, interests) })
  }
}
