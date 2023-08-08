import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect, beforeAll, afterAll } from "vitest"

describe("Campaign api", () => {
  let id = ""
  let idInterest = ""

  const now = new Date(Date.now())
  const numberOfMlSeconds = now.getTime();
  const addMlSeconds = (1 * 60) * 1000;
  const after = new Date(numberOfMlSeconds + addMlSeconds);

  beforeAll(async () => {
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
    const [interest] = responseInterest.data
    idInterest = interest.id
  })

  test('Should create an campaign', async () => {
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
    expect(response.status).toBe(201)
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
    expect(campaign.text).toEqual(expect.stringContaining("text"))
    expect(campaign.interests).toBeInstanceOf(Array)
    expect(campaign.interests).toHaveLength(1)
    expect(new Date(campaign.startTime)).toBeInstanceOf(Date)
    expect(new Date(campaign.endTime)).toBeInstanceOf(Date)
    expect(campaign.status).toBeTruthy()
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
      url: `http://localhost:3000/campaigns/${id}`,
      method: "put",
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
   expect(response.status).toBe(204)
  });

  test('Should delete am campaign', async () => {
    const responseCampaign = await axios({
      url: `http://localhost:3000/campaigns/${id}`,
      method: "delete",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(responseCampaign.status).toBe(204)
  });
  
  afterAll(async()=>{
    const removeInterest = await axios({
      url: `http://localhost:3000/interests/${idInterest}`,
      method: "delete",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(removeInterest.status).toBe(204)
  })

});

