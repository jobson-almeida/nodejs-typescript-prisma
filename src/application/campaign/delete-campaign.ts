import RepositoryFactory from "@/domain/factory/repository-factory";
import CampaignRepository from "@/domain/repository/campaign-repository";
import NotFoundError from "@/infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id: string
}

export default class DeleteCampaign {
  campaignRepository: CampaignRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.campaignRepository = this.repositoryFactory.createCampaignRepository()
  }

  async execute(where: WhereUniqueInput): Promise<void> {
    const campaignFound = await this.campaignRepository.check(where)
    if (!campaignFound) throw new NotFoundError("Campaign not found")
    await this.campaignRepository.delete(where)
  }
} 
