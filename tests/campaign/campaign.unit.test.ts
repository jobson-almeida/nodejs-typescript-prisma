import Campaign from "@/domain/entities/campaign"
import InvalidObjectError from "@/domain/entities/errors/invalid-object"
import { randomUUID } from "crypto"
import { describe, test, expect } from "vitest"

describe("Campaign unit", () => {
  const now = new Date(Date.now())
  const numberOfMlSeconds = now.getTime();
  const addMlSeconds = (1 * 60) * 1000;
  const after = new Date(numberOfMlSeconds + addMlSeconds);
  let campaign: Campaign
  let name = ""
  let text = ""
  let interests:string[] = []
  
  test("Should create campaign unit", () => {
    const input = {
      name: `name ${randomUUID()}`,
      text: `text ${randomUUID()}`,
      interests: [`${randomUUID()}`],
      startTime: now,
      endTime: after,
      status: true,
    }
    campaign = Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status)
    name = campaign.name
    text = campaign.text
    interests.push(campaign.interests[0])

    expect(campaign.name).toEqual(input.name)
    expect(campaign.text).toEqual(input.text)
    expect(campaign.interests).toBeInstanceOf(Array)
    expect(campaign.interests).toHaveLength(1)
    expect(new Date(campaign.startTime)).toBeInstanceOf(Date)
    expect(new Date(campaign.endTime)).toBeInstanceOf(Date)
    expect(campaign.status).toBeTruthy()
    expect(campaign.id).not.toBeUndefined()
    expect(campaign.createdAt).toBeUndefined()
    expect(campaign.updatedAt).toBeUndefined()
  }) 
  
  test("Should not create campaign unit without valid name", () => {
    const input = {
      name: "",
      text: `text ${randomUUID()}`,
      interests: [`${randomUUID()}`],
      startTime: now,
      endTime: after,
      status: true,
    }
  
    expect(() => Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status)).toThrow(new InvalidObjectError("Invalid name field content: set a name"))    
  })

  test("Should not create campaign unit without valid text", () => {
    const input = {
      name: `name ${randomUUID()}`,
      text: "",
      interests: [`${randomUUID()}`],
      startTime: now,
      endTime: after,
      status: true,
    }
  
    expect(() => Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status)).toThrow(new InvalidObjectError("Invalid text field content: set a text"))    
  })

  test("Should not create campaign unit without valid interest id format", () => {
    const input = {
      name: `name ${randomUUID()}`,
      text: `text ${randomUUID()}`,
      interests: ["1"],
      startTime: now,
      endTime: after,
      status: true,
    }
  
    expect(() => Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status)).toThrow(new InvalidObjectError("Invalid interest"))    
  })

  test("Should not create campaign unit without valid date range", () => {
    const input = {
      name: `name ${randomUUID()}`,
      text: `text ${randomUUID()}`,
      interests: [`${randomUUID()}`],
      startTime: after,
      endTime: now,
      status: true,
    }
  
    expect(() => Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status)).toThrow(new InvalidObjectError("Invalid date range"))    
  })

  test("Should update campaign", () => {
    const input = {
      name: `name ${randomUUID()}`,
      text: `text ${randomUUID()}`,
      interests: [`${randomUUID()}`],
      startTime: now,
      endTime: after,
      status: true,
    }
     
    campaign.build(
      input.name, 
      input.text,
      input.interests,
      input.startTime,
      input.endTime,
      input.status
      )
      
      expect(campaign.name).not.toEqual(name)
      expect(campaign.text).not.toEqual(text)
      expect(campaign.interests).not.toContain(interests)
  })
})