import Campaign from "@/domain/entities/campaign"
import InvalidObjectError from "@/domain/entities/errors/invalid-object"
import { randomUUID } from "crypto"
import { describe, test, expect } from "vitest"
 
describe("Campaign unit", () => {
    const now = new Date(Date.now())
    const numberOfMlSeconds = now.getTime();
    const addMlSeconds = (1 * 60) * 1000;
    const after = new Date(numberOfMlSeconds + addMlSeconds);
  
  test("Should create campaign unit", () => {
    const input = {
        name: `name ${randomUUID()}`,
        text: `text ${randomUUID()}`,
        interests: [`${randomUUID()}`],
        startTime: now,
        endTime: after,
        status: true,
    }
    const campaign = Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status) 
  
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
  

})