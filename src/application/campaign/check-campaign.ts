import RepositoryFactory from "@/domain/factory/repository-factory"
import CampaignRepository from "@/domain/repository/campaign-repository"

type WhereUniqueInput = {
  id: string
}

export default class CheckCampaign {
  campaignRepository: CampaignRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = repositoryFactory.createCampaignRepository()
  }

  async execute(where: WhereUniqueInput): Promise<boolean> {
    const campaignFound = await this.campaignRepository.check(where)
    return campaignFound ? true : false
  }
}
