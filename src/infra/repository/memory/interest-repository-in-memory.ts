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

  async list(ids?: string[]): Promise<Interest[]> {
    let output: Interest[] = [];
    let interestsFound = []

    try {
      if (ids && ids.length > 0) {
        for (const id of ids) {
          interestsFound.push(this.interests.find((value) => value.id === id))
        }

        for (const data of interestsFound) {
          data &&
            this.interests.push(new Interest(data.id, data.name, data.active, data.createdAt, data.updatedAt))
        }

        output = output.sort(function (a, b) {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA < dateB ? 1 : -1;
        });
        return output
      }  
    } catch (error) {
      //console.log(error)
    }
    return this.interests
  }

  async check(where: { id?: string, name?: string }): Promise<boolean> {
    const { id, name } = where

    let interestFound: Interest[] = []
    if (this.interests === undefined) return false
    if (id) {
      interestFound = this.interests.filter((value) => value.id === id)
    } else if (name) {
      interestFound = this.interests.filter((value) => value.name === name)
    }
    if (interestFound.length > 0) {
      return true
    }
    return false
  }

/*  async get(where: WhereInput): Promise<Interest | null> {
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