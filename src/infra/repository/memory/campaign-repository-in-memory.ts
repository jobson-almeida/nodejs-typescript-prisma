import CampaignRepository from "@/domain/repository/campaign-repository";
import { randomUUID } from "crypto";

type Campaign = {
  id: string
  name: string
  text: string
  interests: Array<string>
  startTime: Date
  endTime: Date
  status: boolean
  createdAt: Date
  updatedAt: Date
}

type WhereInput = {
  id?: string
}

type UpdateInput = {
  id?: string
  name?: string
  text?: string
  interests?: Array<string>
  startTime?: Date
  endTime?: Date
  status?: boolean
}

type Input = {
  id?: string
  name: string
  text: string
  interests: Array<string>
  startTime: Date
  endTime: Date
  status: boolean
}

export default class CampaignRepositoryDatabaseInMemory implements CampaignRepository {
  campaign: Campaign
  campaigns: Campaign[]

  constructor() { }

  async save(input: Input): Promise<void> {
    this.campaigns = [
      {
        id: randomUUID(),
        name: input.name,
        text: input.text,
        interests: input.interests,
        startTime: input.startTime,
        endTime: input.endTime,
        status: input.status,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ]
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