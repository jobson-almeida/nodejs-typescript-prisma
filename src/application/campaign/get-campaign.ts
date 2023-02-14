import RepositoryFactory from "@/domain/factory/repository-factory";
import CampaignRepository from "@/domain/repository/campaign-repository"
import NotFoundError from "@/infra/http/errors/not-found-error";

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

type WhereUniqueInput = {
  id: string
}

export default class GetCampaign {
  campaignRepository: CampaignRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = repositoryFactory.createCampaignRepository()
  }

  async execute(where: WhereUniqueInput): Promise<Output | null> {
    const campaignFound = await this.campaignRepository.get(where)
    if (!campaignFound) throw new NotFoundError('Campaign not found')
    return {
      id: campaignFound.id,
      name: campaignFound.name,
      text: campaignFound.text,
      interests: campaignFound.interests,
      startTime: campaignFound.startTime,
      endTime: campaignFound.endTime,
      status: campaignFound.status,
      createdAt: campaignFound.createdAt,
      updatedAt: campaignFound.updatedAt
    }
  }
}
