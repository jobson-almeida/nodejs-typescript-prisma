import Interest from "@/domain/entities/interest";
import InterestRepository from "@/domain/repository/interest-repository";

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

  async get(where: { id?: string, name?: string }): Promise<Interest | null> {
    let interestFound
    if (where.id) {
      interestFound = this.interests.find((value) => value.id === where.id)
    } else {
      interestFound = this.interests.find((value) => value.name === where.name)
    }
    if (interestFound)
      return new Interest(interestFound.id, interestFound.name, interestFound.active, interestFound.createdAt, interestFound.updatedAt)
    return null
  }

  async update(params: { where: { id?: string, name?: string }, data: { name: string, active: boolean } }): Promise<void> {
    const { id, name } = params.where
    let interestIndex
    if (id) {
      interestIndex = this.interests.findIndex((value) => value.id === id)
    } else {
      interestIndex = this.interests.findIndex((value) => value.name === name)
    }

    if (interestIndex >= 0) {
      this.interests[interestIndex].name = params.data.name
      this.interests[interestIndex].active = params.data.active
    }
  }
 
  async delete(where: { id: string }): Promise<void> {
    const indexFound = this.interests.findIndex((value) => value.id === where.id)
    this.interests.splice(indexFound, 1) 
  }

}