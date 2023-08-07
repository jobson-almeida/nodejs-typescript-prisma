import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

let id = ""

describe.skip("Campaign api", () => {
  test('Should create an campaign', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    const [campaign] = response.data
    id = campaign.id

    expect(response).not.toBeNull()
    expect(response.data).toHaveLength(1)
    expect(campaign.name).toEqual(expect.stringContaining("name"))
    expect(campaign.text).toEqual(expect.stringContaining("text"))
    expect(campaign.campaigns).toEqual(expect.stringContaining("interests"))
    expect(campaign.startTime).toEqual(expect.stringContaining("startTime"))
    expect(campaign.endTime).toEqual(expect.stringContaining("endTime"))
    expect(campaign.active).toBeTruthy()
    expect(response.status).toBe(200)
  })

  test('Should get campaigns', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    const [campaign] = response.data
    id = campaign.id

    expect(response).not.toBeNull()
    expect(response.data).toHaveLength(1)
    expect(campaign.name).toEqual(expect.stringContaining("name"))
    expect(campaign.interests).toEqual(expect.stringContaining("interests"))
    expect(campaign.startTime).toEqual(expect.stringContaining("startTime"))
    expect(campaign.endTime).toEqual(expect.stringContaining("endTime"))
    expect(campaign.active).toBeTruthy()
    expect(response.status).toBe(200)
  }); 
  
});

