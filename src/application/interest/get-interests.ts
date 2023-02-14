import Interest from "@/domain/entities/interest";
import RepositoryFactory from "@/domain/factory/repository-factory";
import InterestRepository from "@/domain/repository/interest-repository";

type Output = {
  id?: string,
  name: string,
  active: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export default class GetInterests {
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(where?: Array<string>): Promise<Output[]> {
    const interestsFound = await this.interestRepository.list(where);
    return interestsFound.map(interest => (
      {
        id: interest.id,
        name: interest.name,
        active: interest.active,
        createdAt: interest.createdAt,
        updatedAt: interest.updatedAt
      }
    ))
  }
}


