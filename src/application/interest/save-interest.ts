import Interest from "@/domain/entities/interest"
import RepositoryFactory from "@/domain/factory/repository-factory"
import InterestRepository from "@/domain/repository/interest-repository"
import InterestExistsError from "@/infra/http/errors/interest-exists"

type Input = {
  id?: string
  name: string
  active: boolean
}

export default class SaveInterest {
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(data: Input): Promise<void> {
    const { id, name, active } = data
    const existsInterest = await this.interestRepository.check({ name })
    if (existsInterest) throw new InterestExistsError()
    await this.interestRepository.save(new Interest(id, name, active))
  }
}
