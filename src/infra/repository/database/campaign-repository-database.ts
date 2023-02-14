import CampaignRepository from "@/domain/repository/campaign-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { Prisma, Campaign } from "@prisma/client"

export default class CampaignRepositoryDatabase implements CampaignRepository {
  constructor(readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Prisma.CampaignCreateInput): Promise<void> {
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
      return campaignsFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: Prisma.CampaignWhereUniqueInput): Promise<Campaign | null> {
    try {
      const campaignFound = await this.prismaClientAdapter.prismaClient.campaign.findUnique({
        where
      })
      return campaignFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: Prisma.CampaignWhereUniqueInput): Promise<boolean> {
    try {
      const campaignFound = await this.prismaClientAdapter.prismaClient.campaign.findUnique({
        where
      })
      return campaignFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: Prisma.CampaignWhereUniqueInput, data: Prisma.CampaignUpdateInput }): Promise<void> {
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

  async delete(where: Prisma.CampaignWhereUniqueInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.campaign.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }
}