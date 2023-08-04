import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
} 

describe("API test using axios", () => {
  test('Should create an interest from axios', async () => {
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


});