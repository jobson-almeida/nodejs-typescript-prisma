import Campaign from "@/domain/entities/campaign"
import RepositoryFactory from "@/domain/factory/repository-factory"
import CampaignRepository from "@/domain/repository/campaign-repository"
import InterestRepository from "@/domain/repository/interest-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type WhereUniqueInput = {
  id?: string
}

type UpdateInput = {
  id: string | undefined,
  name: string,
  text: string,
  interests: Array<string>,
  startTime: Date,
  endTime: Date,
  status: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export default class UpdateCampaign {
  campaignRepository: CampaignRepository
  interestRepository: InterestRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = repositoryFactory.createCampaignRepository()
    this.interestRepository = repositoryFactory.createInterestRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id } = params.where
    const { name, text, interests, startTime, endTime, status } = params.data

    const campaignFound = await this.campaignRepository.get({ id })
    if (!campaignFound) throw new NotFoundError('Campaign not found')

    if (interests && interests.length > 0) {
      for (let id of interests) {
        const interestFound = await this.interestRepository.check({ id })
        if (!interestFound) throw new NotFoundError("Interest not found")
      }
    }
    await this.campaignRepository.update({
      where: params.where,
      data: new Campaign(id, name, text, interests, startTime, endTime, status)
    })
  }
}
