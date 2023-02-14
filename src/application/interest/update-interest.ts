import Interest from "@/domain/entities/interest"
import RepositoryFactory from "@/domain/factory/repository-factory"
import InterestRepository from "@/domain/repository/interest-repository"
import InterestExistsError from "@/infra/http/errors/interest-exists"
import NotFoundError from "@/infra/http/errors/not-found-error"

type WhereUniqueInput = {
  id?: string
  name?: string
}

export type UpdateInput = {
  id?: string
  name: string
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export default class UpdateInterest {
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id } = params.where
    const { name, active } = params.data

    const interestFound = await this.interestRepository.check({ id })
    if (!interestFound) throw new NotFoundError("Interest not found")
    const interestNameFound = await this.interestRepository.get({ name })
    if (interestNameFound?.id !== id && interestNameFound?.name === name) throw new InterestExistsError()

    await this.interestRepository.update({
      where: params.where,
      data: new Interest(id, name, active)
    })
  }
}
