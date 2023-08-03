import Campaign from "@/domain/entities/campaign"
import CampaignRepository from "@/domain/repository/campaign-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { Prisma } from "@prisma/client"

export default class CampaignRepositoryDatabase implements CampaignRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Campaign): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.campaign.create({
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async list(): Promise<Campaign[]> {
    try {
      const campaignsFound = await this.prismaClientAdapter.prismaClient.campaign.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
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
          ))
      }
      return campaigns
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: { id: string }): Promise<Campaign | null> {
    try {
      const campaignFound = await this.prismaClientAdapter.prismaClient.campaign.findUnique({
        where
      })
      return campaignFound && new Campaign(
        campaignFound.id,
        campaignFound.name,
        campaignFound.text,
        campaignFound.interests,
        campaignFound.startTime,
        campaignFound.endTime,
        campaignFound.status,
        campaignFound.createdAt,
        campaignFound.updatedAt)

    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: { id: string }): Promise<boolean> {
    try {
      const campaignFound = await this.prismaClientAdapter.prismaClient.campaign.findUnique({
        where
      })
      return campaignFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: { id: string }, data: Prisma.CampaignUpdateInput }): Promise<void> {
    try {
      const { where, data } = params
      await this.prismaClientAdapter.prismaClient.campaign.update({
        where,
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async delete(where: { id: string }): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.campaign.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }
}