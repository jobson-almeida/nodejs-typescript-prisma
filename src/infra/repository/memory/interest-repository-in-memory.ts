import Interest from "@/domain/entities/interest";
import InterestRepository from "@/domain/repository/interest-repository";
import { randomUUID } from "crypto";

 
 

export default class InterestRepositoryDatabaseInMemory implements InterestRepository {
  interests: Interest[]

  constructor() {}

  async save(data: Interest): Promise<void> {
    this.interests = []
    const now = new Date(Date.now())

    data.createdAt = now
    data.updatedAt = now
    data && this.interests.push(data) 
  }

  async list(): Promise<Interest[]> {    
    return this.interests
  }
/*
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
  */
}