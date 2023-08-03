import User from "@/domain/entities/user"
import UserRepository from "@/domain/repository/user-repository"
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter"

export default class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter
  ) { }

  async save(data: { id: string, name: string, email: string, interests: string[] }): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.user.create({
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          interests: data.interests 
        }
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
        },
        select: {
          id: true,
          name: true,
          email: true,
          interests: true,
          createdAt: true,
          updatedAt: true
        }, 
      })
      
      const users: User[] = [];
      for (const data of usersFound) {
        users.push(new User(
          data.id,
          data.name,
          data.email,
          data.interests,
          undefined,
          data.createdAt,
          data.updatedAt
        ));
      }
      return users;
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async get(where: { id: string, email: string }): Promise<User | null> {
    try {
      const userFound = await this.prismaClientAdapter.prismaClient.user.findUnique({
        where,
        include: {
          posts: {
            select: {
              id: true,
              text: true, 
              createdAt: true,
              updatedAt: true
            }
          }
        }
      })
      return userFound && new User(
        userFound.id,
        userFound.name,
        userFound.email,
        userFound.interests,
        userFound.posts,
        userFound.createdAt,
        userFound.updatedAt
      )
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async check(where: { id: string, email: string }): Promise<boolean> {
    try {
      const userFound = await this.prismaClientAdapter.prismaClient.user.findUnique({
        where
      })
      return userFound ? true : false
    } finally {
      this.prismaClientAdapter.close
    }
  }

  async update(params: { where: { id: string, email: string }, data: { name: string, email: string, interests: string[] } }): Promise<void> {
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

  async delete(where: { id: string, email: string }): Promise<void> {
    try {
      await this.prismaClientAdapter.prismaClient.user.delete({
        where
      })
    } finally {
      this.prismaClientAdapter.close
    }
  }
}