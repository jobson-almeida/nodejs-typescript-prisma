import Campaign from "@/domain/entities/campaign";
import RepositoryFactory from "@/domain/factory/repository-factory";
import CampaignRepository from "@/domain/repository/campaign-repository";

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

export default class GetCampaigns {
  campaignRepository: CampaignRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = this.repositoryFactory.createCampaignRepository()
  }

  async execute(): Promise<Output[]> {
    const campaignsFound = await this.campaignRepository.list();

    const campaigns: Campaign[] = []
    for (const data of campaignsFound) {
      campaigns.push(
        new Campaign(
          data.id,
          data.name,
          data.text,
          data.interests,
          data.startTime,
          data.endTime,
          data.status,
          data.createdAt,
          data.updatedAt
        )
      )
    }

    return campaignsFound.map(campaign => (
      {
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
    ))
  }
}  
