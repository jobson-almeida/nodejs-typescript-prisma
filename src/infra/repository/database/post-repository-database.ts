import Post from "@/domain/entities/post"
import PostRepository from "@/domain/repository/post-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"

export default class PostRepositoryDatabase implements PostRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) { }

  async save(data: Post): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.post.create({
        data: {
          id: data.id,
          text: data.text,
          authorId: data.authorId
        }
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
        },
        select: {
          id: true,
          text: true,
          authorId: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      const posts: Post[] = [];
      for (const data of postsFound) {
        posts.push(new Post(
          data.id,
          data.text,
          data.authorId,
          data.createdAt,
          data.updatedAt
        ));
      }
      return posts

    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: { id: string }): Promise<Post | null> {
    try {
      const postFound = await this.prismaClientAdapter.prismaClient.post.findUnique({
        where,
        include: {
          author: true
        }
      })
      return postFound && new Post(
        postFound.id,
        postFound.text,
        undefined,
        postFound.createdAt,
        postFound.updatedAt,
        postFound.author
      )
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: { id: string }): Promise<boolean> {
    try {
      const postFound = await this.prismaClientAdapter.prismaClient.post.findUnique({
        where
      })
      return postFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: { id: string }, data: { text: string } }): Promise<void> {
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

  async delete(where: { id: string }): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.post.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }

}