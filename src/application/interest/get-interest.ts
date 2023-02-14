import RepositoryFactory from "@/domain/factory/repository-factory"
import InterestRepository from "@/domain/repository/interest-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type Output = {
  id?: string,
  name: string,
  active: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

type WhereUniqueInput = {
  id?: string
  name?: string
}

export default class GetInterest {
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const interestFound = await this.interestRepository.get(where)
    if (!interestFound) throw new NotFoundError('Interest not found')
    return {
      id: interestFound.id,
      name: interestFound.name,
      active: interestFound.active,
      createdAt: interestFound.createdAt,
      updatedAt: interestFound.updatedAt
    }
  }
}

