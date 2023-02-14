import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
}

let id = ""

describe.skip("interest api", () => {
  test('Should create interest from axios', async () => {
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

  test('Should get interests from axios', async () => {
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

    expect(response).not.toBeNull()
    expect(response.data).toHaveLength(2)
    expect(interest.name).toEqual(expect.stringContaining("name"))
    expect(interest.active).toBeTruthy()
    expect(response.status).toBe(200)
  });

  test('Should get interest from axios', async () => {
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

  test('Should not found interest from axios', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/"1"`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(response.status).toBe(404)
  });

  test('Should delete interest from axios', async () => {
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