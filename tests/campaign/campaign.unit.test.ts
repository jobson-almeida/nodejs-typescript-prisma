import Campaign from "@/domain/entities/campaign"
import InvalidDateError from "@/domain/entities/errors/invalid-date"
import InvalidDateRangeError from "@/domain/entities/errors/invalid-date-range"
import InvalidObjectError from "@/domain/entities/errors/invalid-object"
import InvalidUUIDError from "@/domain/entities/errors/invalid-uuid"
import { randomUUID } from "crypto"
import { describe, test, expect } from "vitest"

type Input = {
  name: string
  text: string
  interests: Array<string>
  startTime: any
  endTime: any
  status: any
}

function dataGenerate(): string {
  return randomUUID()
}

function createNewCampaign(data: Input): Campaign {
  const date = new Date(Date.now())
  const campaign = new Campaign(
    dataGenerate(),
    data.name,
    data.text,
    data.interests,
    data.startTime,
    data.endTime,
    data.status,
    date,
    date
  )
  return campaign
}

describe.skip("Campaign unit", () => {
  const now = new Date(Date.now())
  const after = new Date(Date.now() + 1)
  const uuid = [
    expect.stringMatching(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi)
  ];

  test("Should create campaign", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: now,
      endTime: after,
      status: true,
    }
    const campaign = createNewCampaign(input)
    expect(campaign.name).toEqual(input.name)
    expect(campaign.text).toEqual(input.text)
    expect(campaign.interests).toHaveLength(2)
    expect(campaign.interests).toEqual(
      expect.arrayContaining(uuid),
    )
    expect(campaign.startTime).toBeInstanceOf(Date)
    expect(campaign.endTime).toBeInstanceOf(Date)
    expect(campaign.status).toBeTruthy()
    expect(campaign.createdAt).toBeInstanceOf(Date)
    expect(campaign.updatedAt).toBeInstanceOf(Date)
  })

  test("Should not create campaign with invalid name", () => {
    const input = {
      name: "",
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: now,
      endTime: after,
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidObjectError("Invalid name field content: set a name"))
  })

  test("Should not create campaign with invalid text", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: "",
      interests: [dataGenerate(), dataGenerate()],
      startTime: now,
      endTime: after,
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidObjectError("Invalid text field content: set a text"))
  })

  test("Should not create campaign with invalid interest", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: ["123456", dataGenerate()],
      startTime: now,
      endTime: after,
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidUUIDError("Invalid interest"))
  })

  test("Should not create campaign with invalid start time", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: "now",
      endTime: after,
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidDateError())
  })

  test("Should not create campaign with invalid start time", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: "now",
      endTime: after,
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidDateError())
  })

  test("Should not create campaign with invalid end time", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: now,
      endTime: "after",
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidDateError())
  })

  test("Should not create campaign with invalid end time", () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: after,
      endTime: now,
      status: true,
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidDateRangeError())
  })

  test("Should not create campaign with invalid active status", async () => {
    const input = {
      name: `campaign ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: [dataGenerate(), dataGenerate()],
      startTime: now,
      endTime: after,
      status: "true",
    }
    expect(() => createNewCampaign(input)).toThrow(new InvalidObjectError("Invalid active field content: set true or false"))
  })

})