import axios from "axios"
import { randomUUID } from "crypto"
import { afterAll, beforeAll, describe, expect, test } from "vitest"

describe.skip("API test using axios", () => {
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

    test('Should not create an post from invalid or non-existent author id', async () => {
        const response = await axios({
            url: "http://localhost:3000/posts/",
            method: "post",
            data: {
                text: `text ${randomUUID()}`,
                authorId: randomUUID()
            },
            validateStatus: function (status) {
                return status >= 400 && status <= 500;
            },
        })
        expect(response.status).toBe(404)
    });

    test('Should not create an post from invalid format name', async () => {
        const response = await axios({
            url: "http://localhost:3000/posts/",
            method: "post",
            data: {
                text: "",
                authorId: idUser
            },
            validateStatus: function (status) {
                return status >= 400 && status <= 500;
            },
        })
        expect(response.status).toBe(400)
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

    test('Should get post from id', async () => {
        const response = await axios({
            url: `http://localhost:3000/posts/${id}`,
            method: "get",
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })
        expect(response.status).toBe(200)
    });

    test('Should not get post from non-existent id', async () => {
        const response = await axios({
            url: `http://localhost:3000/posts/${randomUUID()}`,
            method: "get",
            validateStatus: function (status) {
                return status >= 400 && status <= 500;
            },
        })
        expect(response.status).toBe(404)
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

    test('Should not delete post from non-existent id', async () => {
        const response = await axios({
            url: `http://localhost:3000/posts/${randomUUID()}`,
            method: "delete",
            validateStatus: function (status) {
                return status >= 400 && status <= 500;
            },
        })
        expect(response.status).toBe(404)
    });

    afterAll(async () => {
        if (idUser) {
            const deletedUser = await axios({
                url: `http://localhost:3000/users/${idUser}`,
                method: "delete",
                responseType: "json",
                validateStatus: function (status) {
                    return status >= 200 && status < 299;
                },
            })
            expect(deletedUser.status).toBe(204)
        }

        if (idInterest) {
            const deletedInterest = await axios({
                url: `http://localhost:3000/interests/${idInterest}`,
                method: "delete",
                responseType: "json",
                validateStatus: function (status) {
                    return status >= 200 && status < 299;
                },
            })
            expect(deletedInterest.status).toBe(204)
        }
    })
})