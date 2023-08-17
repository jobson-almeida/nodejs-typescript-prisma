import Interest from "@/domain/entities/interest";
import User from "@/domain/entities/user";
import InterestRepositoryDatabaseInMemory from "@/infra/repository/memory/interest-repository-in-memory";
import UserRepositoryDatabaseInMemory from "@/infra/repository/memory/user-repository-in-memory";
import { randomUUID } from "crypto";
import { beforeAll, describe, expect, test } from "vitest";

const userRepository = new UserRepositoryDatabaseInMemory();
const interestRepository = new InterestRepositoryDatabaseInMemory();


describe('Integration test', () => {
    let id = ""
    let name = ""
    let email = ""
    let interests = []
    let idInterest = ""

    beforeAll(async () => {
        const users: User[] = await userRepository.list()
        if (users) {
            for (let data of users) {
                await userRepository.delete({ id: data.id })
            }
        }

        const input = { name: `name ${randomUUID()}`, active: true }
        const newInterest = Interest.create(input.name, input.active)
        await interestRepository.save(newInterest)
        idInterest = newInterest.id
    })

    test('It should check, create and list an user', async () => {
        const input = {
            name: `name ${randomUUID()}`,
            email: "user@email.com",
            interests: [idInterest] 
        };

        const existsUser = await userRepository.check({ email: input.email })
        let newUser: User

        const [interestsFound] = await interestRepository.list(input.interests)

        if (!existsUser && interestsFound) {
            newUser = User.create(input.name, input.email, input.interests)
            await userRepository.save(newUser)

            const usersFound = await userRepository.list()
            const [user] = usersFound

            id = user.id
            name = user.name
            email = user.email
            interests = user.interests

            expect(existsUser).toBeFalsy()
            expect(usersFound).not.toBeNull()
            expect(usersFound).toHaveLength(1)
            expect(input.name).toBe(user.name);
            expect(input.email).toBe(user.email);
            expect(input.interests).toBe(user.interests);
        } 
    })

})