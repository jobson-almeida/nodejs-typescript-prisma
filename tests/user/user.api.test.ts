import Interest from "@/domain/entities/interest";
import axios from "axios";
import { randomUUID } from "crypto";
import { afterAll, beforeAll, describe, expect, test } from "vitest";


describe("API test using axios", () => {
    let id = ""
    let name = ""
    let email = ""
    let idInterest = ""

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
    })

    test('Should create an user', async () => {
        const response = await axios({
            url: "http://localhost:3000/users/",
            method: "post",
            data: {
                name: `name ${randomUUID()}`,
                email: "user@email.com",
                interests: [`${idInterest}`]
            },
            validateStatus: function (status) {
                return status >= 200 && status < 299;
            },
        })
        expect(response.status).toBe(201)
    });


})