import Interest from "@/domain/entities/interest"
import RepositoryFactory from "@/domain/factory/repository-factory"
import InterestRepository from "@/domain/repository/interest-repository"
import InterestExistsError from "@/infra/http/errors/interest-exists"

type Input = {
  name: string
  active: boolean
}

export default class SaveInterest {
  interestRepository: InterestRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = this.repositoryFactory.createInterestRepository()
  }

  async execute(data: Input): Promise<void> {
    const { name, active } = data
    const existsInterest = await this.interestRepository.check({ name })
    if (existsInterest) throw new InterestExistsError()
    const interest = Interest.create(name, active)
    await this.interestRepository.save(interest)
  }
}
