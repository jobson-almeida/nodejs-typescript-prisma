import axios from "axios"
import { randomUUID } from "crypto"
import { afterAll, beforeAll, describe, expect, test } from "vitest"

describe("API test using axios", () => {
    let id = ""
    let text = ""
    let authorId = ""
    let idInterest = ""
    let idUser = ""

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
        if (interest) {
            idInterest = interest.id
        }

        //------------

        await axios({
            url: "http://localhost:3000/users/",
            method: "post",
            responseType: "json",
            data: {
                name: `name ${randomUUID()}`,
                email: "user@email.com",
                interests: [`${idInterest}`]
            },
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })

        const responseUser = await axios({
            url: "http://localhost:3000/users/",
            method: "get",
            responseType: "json",
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })
        const [user] = responseUser.data
        if (user) {
            idUser = user.id
        }
    })

    //---------
    test('Should create an post', async () => {
        const response = await axios({
            url: "http://localhost:3000/posts/",
            method: "post",
            data: {
                text: `text ${randomUUID()}`,
                authorId: idUser
            },
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })
        expect(response.status).toBe(201)
    });

    test('Should get posts', async () => {
        const response = await axios({
            url: "http://localhost:3000/posts/",
            method: "get",
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })
        const [post] = response.data
        id = post.id
        text = post.text      
        expect(response.status).toBe(200)
    });

    test('Should delete post from id', async () => {
        const response = await axios({
            url: `http://localhost:3000/posts/${id}`,
            method: "delete",
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })
        expect(response.status).toBe(204)
    });

})