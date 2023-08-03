import Interest from "@/domain/entities/interest";
import RepositoryFactory from "@/domain/factory/repository-factory";
import InterestRepository from "@/domain/repository/interest-repository";

type Output = {
  id: string,
  name: string,
  active: boolean,
  createdAt: Date,
  updatedAt: Date
}

export default class GetInterests {
  interestRepository: InterestRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = this.repositoryFactory.createInterestRepository()
  }

  async execute(where?: string[]): Promise<Output[]> {
    const interestsFound = await this.interestRepository.list(where);
    const interests: Interest[] = []
    for (const data of interestsFound) {
      interests.push(new Interest(
        data.id,
        data.name,
        data.active,
        data.createdAt,
        data.updatedAt
      ))
    }

    return interests.map(interest => ({
      id: interest.id,
      name: interest.name,
      active: interest.active,
      createdAt: interest.createdAt,
      updatedAt: interest.updatedAt
    }))
  }
}
