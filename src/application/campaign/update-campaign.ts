import RepositoryFactory from "@/domain/factory/repository-factory"
import CampaignRepository from "@/domain/repository/campaign-repository"
import InterestRepository from "@/domain/repository/interest-repository"
import NotFoundError from "@/infra/http/errors/not-found-error"

type WhereUniqueInput = {
  id: string
}

type UpdateInput = {
  name: string,
  text: string,
  interests: string[],
  startTime: Date,
  endTime: Date,
  status: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export default class UpdateCampaign {
  campaignRepository: CampaignRepository
  interestRepository: InterestRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = this.repositoryFactory.createCampaignRepository()
    this.interestRepository = this.repositoryFactory.createInterestRepository()
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
    campaignFound.build(name, text, interests, startTime, endTime, status)
    const campaign = {
      name: campaignFound.name,
      text: campaignFound.text,
      interests: campaignFound.interests,
      startTime: campaignFound.startTime,
      endTime: campaignFound.endTime,
      status: campaignFound.status
    }

    await this.campaignRepository.update({
      where: params.where,
      data: campaign
    })
  }
}
