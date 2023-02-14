import Campaign from "@/domain/entities/campaign"
import RepositoryFactory from "@/domain/factory/repository-factory"
import CampaignRepository from "@/domain/repository/campaign-repository"
import InterestRepository from "@/domain/repository/interest-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type CreateInput = {
  id?: string | undefined,
  name: string,
  text: string,
  interests: Array<string>,
  startTime: Date,
  endTime: Date,
  status: boolean
}

export default class SaveCampaign {
  campaignRepository: CampaignRepository
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = repositoryFactory.createCampaignRepository()
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(data: CreateInput): Promise<void> {
    const { id, name, text, interests, startTime, endTime, status } = data
    if (data.interests && data.interests.length > 0) {
      for (let id of data.interests) {
        const existsInterest = await this.interestRepository.check({ id })
        if (!existsInterest) throw new NotFoundError("Interest not found")
      }
    }
    await this.campaignRepository.save(new Campaign(
      id,
      name,
      text,
      interests,
      startTime,
      endTime,
      status
    ))
  }
}
