import PostRepository from "@/domain/repository/post-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"
import { Prisma, Post } from "@prisma/client"

export default class PostRepositoryDatabase implements PostRepository {
  constructor(readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Prisma.PostUncheckedCreateInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.post.create({
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async list(): Promise<Post[]> {
    try {
      const postsFound = await this.prismaClientAdapter.prismaClient.post.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      return postsFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    try {
      const postFound = await this.prismaClientAdapter.prismaClient.post.findUnique({
        where
      })
      return postFound
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: Prisma.PostWhereUniqueInput): Promise<boolean> {
    try {
      const postFound = await this.prismaClientAdapter.prismaClient.post.findUnique({
        where
      })
      return postFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput }): Promise<void> {
    try {
      const { where, data } = params
      await this.prismaClientAdapter.prismaClient.post.update({
        where,
        data
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.post.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

}