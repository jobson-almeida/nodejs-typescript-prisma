import InterestRepository from "@/domain/repository/interest-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { Prisma, Interest } from "@prisma/client"

export default class InterestRepositoryDatabase implements InterestRepository {
  constructor(readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Prisma.InterestCreateInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.interest.create({
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async list(ids?: Array<string>): Promise<Interest[]> {
    try {
      let interestsFound: Interest[] = []
      if (ids && ids?.length > 0) {
        interestsFound = await this.prismaClientAdapter.prismaClient.interest.findMany({
          where: {
            id: {
              in: ids,
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      } else {
        interestsFound = await this.prismaClientAdapter.prismaClient.interest.findMany({
          orderBy: {
            createdAt: 'desc'
          }
        })
      }
      return interestsFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: Prisma.InterestWhereUniqueInput): Promise<Interest | null> {
    try {
      const interestFound = await this.prismaClientAdapter.prismaClient.interest.findUnique({
        where
      })
      return interestFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: Prisma.InterestWhereUniqueInput): Promise<boolean> {
    try {
      const interestFound = await this.prismaClientAdapter.prismaClient.interest.findUnique({
        where
      })
      return interestFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: Prisma.InterestWhereUniqueInput, data: Prisma.InterestUpdateInput }): Promise<void> {
    const { where, data } = params
    try {
      await this.prismaClientAdapter.prismaClient.interest.update({
        where,
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async delete(where: Prisma.InterestWhereUniqueInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.interest.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

}