import UserRepository from "@/domain/repository/user-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { Prisma, User } from "@prisma/client"

export default class UserRepositoryDatabase implements UserRepository {
  constructor(readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Prisma.UserUncheckedCreateInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.user.create({
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async list(): Promise<User[]> {
    try {
      const usersFound = await this.prismaClientAdapter.prismaClient.user.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      return usersFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      const userFound = await this.prismaClientAdapter.prismaClient.user.findUnique({
        where,
        include: {
          posts: {
            take: 2,
            orderBy: {
              createdAt: 'desc'
            },
            select: {
              id: true,
              text: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      })
      return userFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
    try {
      const userFound = await this.prismaClientAdapter.prismaClient.user.findUnique({
        where
      })
      return userFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }): Promise<void> {
    const { where, data } = params
    try {
      await this.prismaClientAdapter.prismaClient.user.update({
        where,
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.user.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }
}