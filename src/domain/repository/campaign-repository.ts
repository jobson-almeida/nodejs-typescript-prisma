import Campaign from "../entities/campaign"

type WhereUniqueInput = {
  id?: string
}

type UpdateInput = {
  id?: string
  name?: string,
  text?: string,
  interests?: Array<string>,
  startTime?: Date,
  endTime?: Date,
  status?: boolean
}

export default interface CampaignRepository {
  save(data: Campaign): Promise<void>
  list(): Promise<Campaign[]>
  get(where: WhereUniqueInput): Promise<Campaign | null>
  check(where: WhereUniqueInput): Promise<boolean>
  update(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void>
  delete(where: WhereUniqueInput): Promise<void>
}