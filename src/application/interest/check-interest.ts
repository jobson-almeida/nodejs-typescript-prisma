import RepositoryFactory from "@/domain/factory/repository-factory"
import InterestRepository from "@/domain/repository/interest-repository"

type WhereUniqueInput = {
  id?: string
  name?: string
}

export default class CheckInterest {
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(where: WhereUniqueInput): Promise<boolean> {
    return await this.interestRepository.check(where)
  }
}
