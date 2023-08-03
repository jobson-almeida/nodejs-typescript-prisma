import Interest from "@/domain/entities/interest"
import RepositoryFactory from "@/domain/factory/repository-factory"
import InterestRepository from "@/domain/repository/interest-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type Output = {
  id: string,
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
    this.interestRepository = this.repositoryFactory.createInterestRepository()
  }
  
  async execute(where: WhereUniqueInput): Promise<Output | null> {    
    const interestFound = await this.interestRepository.get(where)
    if (!interestFound) throw new NotFoundError('Interest not found')
    const interest:Interest = new Interest(interestFound.id, interestFound.name, interestFound.active, interestFound.createdAt, interestFound.updatedAt)

    console.log(interest)
    
    return {
      id: interest.id,
      name: interest.name,
      active: interest.active,
      createdAt: interest.createdAt,
      updatedAt: interest.updatedAt
    }
  }
}

