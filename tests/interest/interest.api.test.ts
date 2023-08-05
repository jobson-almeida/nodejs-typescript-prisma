import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
} 

let id = ""
let unique = ""

describe("API test using axios", () => {
  test('Should create an interest', async () => {
    const response = await axios({
      url: "http://localhost:3000/interests/",
      method: "post",
      data: {
        name: `name${dataGenerate()}`,
        active: true
      },
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(201)
  });

  test('Should get interests', async () => {
    const response = await axios({
      url: "http://localhost:3000/interests/",
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    const [interest] = response.data
    id = interest.id
    unique = interest.name

    expect(response).not.toBeNull()
    expect(response.data).toHaveLength(1)
    expect(interest.name).toEqual(expect.stringContaining("name"))
    expect(interest.active).toBeTruthy()
    expect(response.status).toBe(200)
  }); 

  test('Should get an interest from id', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/${id}`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(200)
  });

  test('Should get an interest from name', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/${unique}`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(200)
  });

  test('Should delete an interest from id', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/${id}`,
      method: "delete",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(204)
  });

});