import axios from "axios"
import { randomUUID } from "crypto";
import { describe, test, expect, beforeAll } from "vitest"

describe("API test using axios", () => {
  let id = ""
  let name = ""

  beforeAll(async () => {
    const response = await axios({
      url: "http://localhost:3000/interests/",
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })

    if (response) {
      for (let data of response.data) {
        await axios({
          url: `http://localhost:3000/interests/${data.id}`,
          method: "delete",
          responseType: "json",
          validateStatus: function (status) {
            return status >= 200 && status < 299;
          },
        }) 
    
      }
    }
  })
  
  test('Should create an interest', async () => {
    const response = await axios({
      url: "http://localhost:3000/interests/",
      method: "post",
      data: {
        name: `name ${randomUUID()}`,
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
    id = response.data[0].id
    name = response.data[0].name

    expect(response).not.toBeNull()
    expect(response.data).toHaveLength(1)
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

  test('Should not get an interest from id', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/1`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 400 && status <= 500;
      },
    })
    expect(response.status).toBe(404)
  }); 

  test('Should get an interest from name', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/${name}`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(200)
  });

  test('Should not get an interest from name', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/new interest`,
      method: "get",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 400 && status <= 500;
      },
    })
    expect(response.status).toBe(404)
  });

  test('Should update an interest', async () => {
    const response = await axios({
      url: `http://localhost:3000/interests/${id}`,
      method: "put",
      data: {
        name: `name ${randomUUID()}`,
        active: false
      },
      validateStatus: function (status) {
        return status >= 200 && status < 299;
      },
    })
    expect(response.status).toBe(204)
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