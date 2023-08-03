import RepositoryFactory from "@/domain/factory/repository-factory";
import InterestRepository from "@/domain/repository/interest-repository";
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id?: string,
  name?: string
}

export default class DeleteInterest {
  interestRepository: InterestRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.interestRepository = this.repositoryFactory.createInterestRepository()
  }

  async execute(where: WhereUniqueInput): Promise<void> {
    const interestFound = await this.interestRepository.check(where)
    if (!interestFound) throw new NotFoundError("Interest not found")
    await this.interestRepository.delete(where)
  }
} 
