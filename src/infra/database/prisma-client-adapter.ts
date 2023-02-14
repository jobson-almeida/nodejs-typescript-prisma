import { PrismaClient } from '@prisma/client'

export default class PrismaClientAdapter {
  prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async close(): Promise<void> {
    return await this.prismaClient.$disconnect()
  }
}