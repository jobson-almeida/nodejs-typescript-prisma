import Campaign from "@/domain/entities/campaign";
import CampaignRepository from "@/domain/repository/campaign-repository";

type WhereInput = {
  id: string
}

type UpdateInput = {
  name?: string
  text?: string
  interests?: string[]
  startTime?: Date
  endTime?: Date
  status?: boolean
}

export default class CampaignRepositoryDatabaseInMemory implements CampaignRepository {
  campaign: Campaign
  campaigns: Campaign[]

  constructor() {}

  async save(input: Campaign): Promise<void> {
    this.campaigns = []
    let now: Date
    let numberOfMlSeconds: number
    let addMlSeconds: number
    let after: Date

    now = new Date(Date.now())
    numberOfMlSeconds = now.getTime();
    addMlSeconds = (1 * 60) * 1000;
    after = new Date(numberOfMlSeconds + addMlSeconds);

    input.createdAt = now
    input.updatedAt = now
    input && this.campaigns.push(input)
  }

  async list(): Promise<Campaign[]> {
    return this.campaigns
  }

  async check(where: WhereInput): Promise<boolean> {
    const campaignFound = this.campaigns.find((value) => value.id === where.id)
    return campaignFound ? true : false
  }

  async get(where: WhereInput): Promise<Campaign | null> {
    const campaign = this.campaigns.find((value) => value.id === where.id)
    return campaign ?? null
  }

  async update(params: { where: WhereInput, data: UpdateInput }): Promise<void> {
    const indexFound = this.campaigns.findIndex((value) => value.id === params.where.id)
    if (indexFound >= 0) {
      if (params.data.name) this.campaigns[indexFound].name = params.data.name
      if (params.data.text) this.campaigns[indexFound].text = params.data.text
      if (params.data.interests) this.campaigns[indexFound].interests = params.data.interests
      if (params.data.startTime) this.campaigns[indexFound].startTime = params.data.startTime
      if (params.data.endTime) this.campaigns[indexFound].endTime = params.data.endTime
      if (params.data.status) this.campaigns[indexFound].status = params.data.status
      this.campaigns[indexFound].updatedAt = new Date(Date.now())
    }
  }

  async delete(where: WhereInput): Promise<void> {
    const indexFound = this.campaigns.findIndex((value) => value.id === where.id)
    this.campaigns.splice(indexFound, 1)
  }

}