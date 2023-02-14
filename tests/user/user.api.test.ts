import { randomUUID } from "crypto";
import axios from 'axios';
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
}

let id = ""

describe.skip('User api tests', () => {

  test('Should create user from axios', async () => {
    const createdUser = await axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: {
        name: "name",
        email: "name@email.com",
        interests: [randomUUID(), randomUUID()]
      },
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    })
    expect(createdUser.status).toBe(201)
  })

  test('Should create user with existed email from axios', async () => {
    const createdUser = await axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: {
        name: "other-name",
        email: "name@email.com",
        interests: [randomUUID(), randomUUID()]
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    })
    expect(createdUser.status).toBe(409)
    expect(createdUser.statusText).toBe('Conflict')
  })

  test('Should get users from axios', async () => {
    const users = await axios({
      method: "get",
      url: `http://localhost:3000/users`,
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    })
    const [user] = users.data
    id = user.id

    expect(users.status).toBe(200)
    expect(users.data.length).toBe(1)
    expect(user.email).toBe('name@email.com')
  })

  test('Should get user from axios', async () => {
    const user = await axios({
      method: "get",
      url: `http://localhost:3000/users/${id}`,
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    })

    expect(user.status).toBe(200)
    expect(user.data.id).toBe(id)
    expect(user.data.email).toBe('name@email.com')
  })

  test('Should get user with not existed id from axios', async () => {
    const user = await axios({
      method: "get",
      url: "http://localhost:3000/users/1",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    })

    expect(user.status).toBe(404)
  })

  test('Should update user from axios', async () => {
    const user = await axios({
      method: "get",
      url: `http://localhost:3000/users/${id}`,
      responseType: "json"
    })

    const updatedUser = await axios({
      method: "put",
      url: `http://localhost:3000/users/${id}`,
      data: {
        name: "other-name",
        email: "name@email.com",
        interests: [randomUUID(), randomUUID()]
      },
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    })
    expect(updatedUser.status).toBe(204)
    expect(user.data?.name).not.toBe(updatedUser.data.name)
  })

  test('Should delete user from axios', async () => {
    const deleted = await axios({
      method: 'delete',
      url: `http://localhost:3000/users/${id}`,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    })

    expect(deleted.status).toBe(204)
  });

});