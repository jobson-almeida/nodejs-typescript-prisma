import User from "@/domain/entities/user";
import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";


describe("User unit", () => {
    let user:User
    let name = ""
    let email = ""

    test("Should create user", () => {
       const input = {
        name: `name ${randomUUID()}`,
        email: `user@email.com`,
        interests: [`${randomUUID()}`]
       }

       user = User.create(input.name, input.email, input.interests)
       name = user.name
       email = user.email

       expect(user).not.toBeNull()
       expect(user.id).toBeDefined()
       expect(input.name).toEqual(user.name)
       expect(input.email).toEqual(user.email)
       expect(input.interests).toHaveLength(1)
    })

    test("Should update user", () => {
        const input = {
         name: `name ${randomUUID()}`,
         email: `another@email.com`,
         interests: [`${randomUUID()}`]
        }
        
        user.build(input.name, input.email, input.interests) 
        expect(input.name).not.toEqual(name)
        expect(input.email).not.toEqual(email) 
     })
})