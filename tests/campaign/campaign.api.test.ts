import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
}

let id = ""

describe.skip("Campaign api", () => {
  const now = new Date(Date.now())
  const numberOfMlSeconds = now.getTime();
  const addMlSeconds = (1 * 60) * 1000;
  const after = new Date(numberOfMlSeconds + addMlSeconds);

  test('Should create campaign using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: `name ${dataGenerate()}`,
        text: `text ${dataGenerate()}`,
        interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"], //use a valid database interest ID
        startTime: now,
        endTime: after,
        status: true,
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(201)
  });

  test('Should not create campaign with invalid name using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: "",
        text: `text ${dataGenerate()}`,
        interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"], //use a valid database interest ID
        startTime: now,
        endTime: after,
        status: true,
      },
      validateStatus: function (statusCode) {
        return statusCode >= 200 && statusCode <= 404;
      },
    })
    expect(response.status).toBe(400)
  });

  test('Should not create campaign with invalid text using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: `name ${dataGenerate()}`,
        text: "",
        interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"], //use a valid database interest ID
        startTime: now,
        endTime: after,
        status: true,
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(400)
  });

  test('Should not create campaign with invalid interest using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: `name ${dataGenerate()}`,
        text: `text ${dataGenerate()}`,
        interests: ["-6a61b062-ba16-44c1-b7a7-44bbfb2a8785"],
        startTime: now,
        endTime: after,
        status: true,
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(404)
  });

  test('Should not create campaign with invalid start time using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: `name ${dataGenerate()}`,
        text: `text ${dataGenerate()}`,
        interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"], //use a valid database interest ID
        startTime: "now",
        endTime: after,
        status: true,
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(400)
  });

  test('Should not create campaign with invalid end time using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: `name ${dataGenerate()}`,
        text: `text ${dataGenerate()}`,
        interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"], //use a valid database interest ID
        startTime: now,
        endTime: "after",
        status: true,
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(400)
  });

  test('Should not create campaign with invalid range date using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "post",
      data: {
        name: `name ${dataGenerate()}`,
        text: `text ${dataGenerate()}`,
        interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"], //use a valid database interest ID
        startTime: after,
        endTime: now,
        status: true,
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(400)
  });

  test('Should get campaigns using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/",
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    const [campaign] = response.data
    id = campaign.id

    expect(response).not.toBeNull()
    expect(campaign.name).toEqual(expect.stringContaining("name"))
    expect(campaign.text).toEqual(expect.stringContaining("text"))
    expect(campaign.interests).toHaveLength(1)
    expect(campaign.status).toBeTruthy()

    expect(response.status).toBe(200)
  });

  test('Should get campaign using axios', async () => {
    const response = await axios({
      url: `http://localhost:3000/campaigns/${id}`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(200)
  });

  test('Should not found campaign using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/1",
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(404)
  });

  test('Should not delete campaign with id using axios', async () => {
    const response = await axios({
      url: "http://localhost:3000/campaigns/1",
      method: "delete",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(404)
  });

  test('Should delete campaign using axios', async () => {
    const response = await axios({
      url: `http://localhost:3000/campaigns/${id}`,
      method: "delete",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(204)
  });

});