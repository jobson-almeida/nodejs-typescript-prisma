import Interest from "@/domain/entities/interest";
import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

let id = ""

describe.skip("Campaign api", () => {
  const now = new Date(Date.now())
  const numberOfMlSeconds = now.getTime();
  const addMlSeconds = (1 * 60) * 1000;
  const after = new Date(numberOfMlSeconds + addMlSeconds);

  test('Should create an campaign', async () => {
    await axios({
      url: "http://localhost:3000/interests/",
      method: "post",
      responseType: "json",
      data: {
        name: `name ${randomUUID()}`,
        active: true
      },
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
 
    const responseInterest = await axios({
      url: "http://localhost:3000/interests/",
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    const [newInterest] = responseInterest.data
    const idInterest = newInterest.id
 
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      responseType: "json",
      data: {
        name: `name ${randomUUID()}`,
        text: `text ${randomUUID()}`,
        interests: [`${idInterest}`],
        startTime: now,
        endTime: after,
        status: true,
      },
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
  
  test('Should get an campaign from id', async () => {
    const response = await axios({
      url: `http://localhost:3000/campaigns/${id}`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(200)
  });

  test('Should not get an campaign from id', async () => {
    const response = await axios({
      url: `http://localhost:3000/campaigns/1`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 400 && status <= 500;
      },
    })
    expect(response.status).toBe(404)
  }); 

  test('Should update an campaign', async () => {
    const response = await axios({
      url: `"http://localhost:3000/campaigns/${id}`,
      method: "put",
      data: {
        name: `name${randomUUID()}`,
        text: `text${randomUUID()}`,
        interests: [""enter data to create test record Create],
        startTime: now,
        endTime: after,
        status: true 
      },
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(201)
  });

  test('Should delete am campaign', async () => {
    const response = await axios({
      url: `http://localhost:4000/campaign/${id}`,
      method: "delete",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(204)
  });

});

