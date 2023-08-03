import Campaign from "@/domain/entities/campaign";
import RepositoryFactory from "@/domain/factory/repository-factory";
import CampaignRepository from "@/domain/repository/campaign-repository"
import NotFoundError from "@/infra/http/errors/not-found-error";

type Output = {
  id: string,
  name: string,
  text: string,
  interests: string[],
  startTime: Date,
  endTime: Date,
  status: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

type WhereUniqueInput = {
  id: string
}

export default class GetCampaign {
  campaignRepository: CampaignRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = this.repositoryFactory.createCampaignRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const campaignFound = await this.campaignRepository.get(where)
    if (!campaignFound) throw new NotFoundError('Campaign not found')
    const campaign: Campaign = new Campaign(
      campaignFound.id,
      campaignFound.name,
      campaignFound.text,
      campaignFound.interests,
      campaignFound.startTime,
      campaignFound.endTime,
      campaignFound.status,
      campaignFound.createdAt,
      campaignFound.updatedAt
    )

    return {
      id: campaign.id,
      name: campaign.name,
      text: campaign.text,
      interests: campaign.interests,
      startTime: campaign.startTime,
      endTime: campaign.endTime,
      status: campaign.status,
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt
    }
  }
}
