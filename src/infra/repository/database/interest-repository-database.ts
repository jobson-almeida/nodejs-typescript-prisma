import Interest from "@/domain/entities/interest"
import InterestRepository from "@/domain/repository/interest-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"

export default class InterestRepositoryDatabase implements InterestRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Interest): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.interest.create({
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async list(ids?: string[]): Promise<Interest[]> {
    try {
      let interestsFound = []
      if (ids && ids.length > 0) {
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

      const interests: Interest[] = [];
      for (const data of interestsFound) {
        interests.push(new Interest(
          data.id,
          data.name,
          data.active,
          data.createdAt,
          data.updatedAt
        )
        );
      }
      return interests
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: { id: string, name: string }): Promise<Interest | null> {
    try {
      const interestFound = await this.prismaClientAdapter.prismaClient.interest.findUnique({
        where
      })
      if (interestFound)
        return new Interest(interestFound.id, interestFound.name, interestFound.active, interestFound.createdAt, interestFound.updatedAt)
      return null
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: { id: string, name: string }): Promise<boolean> {
    try {
      const interestFound = await this.prismaClientAdapter.prismaClient.interest.findUnique({
        where
      })
      return interestFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: { id: string, name: string }, data: { name: string, active: boolean }}): Promise<void> {
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

  async delete(where: { id: string }): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.interest.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

}
