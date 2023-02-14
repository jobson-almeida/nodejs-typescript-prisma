import RepositoryFactory from "@/domain/factory/repository-factory";
import CampaignRepository from "@/domain/repository/campaign-repository";

type Output = {
  id?: string,
  name: string,
  text: string,
  interests: Array<string>,
  startTime: Date,
  endTime: Date,
  status: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export default class GetCampaigns {
  campaignRepository: CampaignRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = repositoryFactory.createCampaignRepository()
  }

  async execute(): Promise<Output[]> {
    const campaignsFound = await this.campaignRepository.list();

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
