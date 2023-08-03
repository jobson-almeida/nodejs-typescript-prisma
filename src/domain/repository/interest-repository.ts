import Interest from "../entities/interest"

 
type WhereUniqueInput = {
  id?: string
  name?: string
}

type UpdateInput = {
  name?: string
  active?: boolean
}

export default interface InterestRepository {
  save(data: Interest): Promise<void>
  list(where?: Array<string>): Promise<Interest[]>
  get(where: WhereUniqueInput): Promise<Interest | null>
  check(where: WhereUniqueInput): Promise<boolean>
  update(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void>
  delete(where: WhereUniqueInput): Promise<void>
}