import InterestRepository from "@/domain/repository/interest-repository";
import { randomUUID } from "crypto";

type Interest = {
  id: string
  name: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

type WhereInput = {
  id?: string
  name?: string
}

type UpdateInput = {
  id?: string
  name?: string
  active?: boolean
}

type Input = {
  id?: string
  name: string
  active: boolean
}

export default class InterestRepositoryDatabaseInMemory implements InterestRepository {
  interest: Interest
  interests: Interest[]

  constructor() { }

  async save(input: Input): Promise<void> {
    this.interests = [
      {
        id: randomUUID(),
        name: input.name,
        active: input.active,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ]
  }

  async list(): Promise<Interest[]> {
    return this.interests
  }

  async check(where: WhereInput): Promise<boolean> {
    const interestFound = this.interests.find((value) => value.id === where.id)
    return interestFound ? true : false
  }

  async get(where: WhereInput): Promise<Interest | null> {
    const interest = this.interests.find((value) => value.id === where.id)
    return interest ?? null
  }

  async update(params: { where: WhereInput, data: UpdateInput }): Promise<void> {
    const indexFound = this.interests.findIndex((value) => value.id === params.where.id)
    if (indexFound >= 0) {
      if (params.data.name) this.interests[indexFound].name = params.data.name
      if (params.data.active) this.interests[indexFound].active = false //params.data.active
      this.interests[indexFound].updatedAt = new Date(Date.now())
    }
  }

  async delete(where: WhereInput): Promise<void> {
    const indexFound = this.interests.findIndex((value) => value.id === where.id)
    this.interests.splice(indexFound, 1)
  }
}