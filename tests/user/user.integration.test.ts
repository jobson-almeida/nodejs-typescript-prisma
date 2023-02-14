import { randomUUID } from "crypto";
import UserRepositoryDatabaseInMemory from "@/infra/repository/memory/user-repository-in-memory";
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter";
//import UserRepositoryDatabase from "@/infra/repository/database/user-repository-database";
import { describe, test, expect } from "vitest"

function dataGenerate(): string {
  return randomUUID()
}

const prismaClientAdapter = new PrismaClientAdapter();
//const userRepository = new UserRepositoryDatabase(prismaClientAdapter)
const userRepository = new UserRepositoryDatabaseInMemory()
const uuid = [
  expect.stringMatching(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi)
];

describe.skip('User integration tests', () => {
  let id = ""

  test('Should save user', async () => {
    const input = {
      name: `name${dataGenerate()}`,
      email: `${dataGenerate()}@email.com`,
      interests: [dataGenerate(), dataGenerate()]
    }
    await userRepository.save(input)
    const usersFound = await userRepository.list()
    const [user] = usersFound
    id = user.id

    expect(usersFound).not.toBeNull()
    expect(usersFound).toHaveLength(1)
    expect(user.name).toBe(input.name)
    expect(user.email).toBe(input.email)
    expect(user.interests.length).toEqual(2)
    expect(user.interests).toEqual(
      expect.arrayContaining(uuid),
    )
  })

  test('Should check user exists', async () => {
    const existsUser = await userRepository.check({ id })
    expect(existsUser).toBeTruthy()
  })

  test('Should check user not exists', async () => {
    const existsUser = await userRepository.check({ id: "123456" })
    expect(existsUser).toBeFalsy()
  })

  test('Should get user', async () => {
    const userFound = await userRepository.get({ id })
    expect(userFound).not.toBeNull()
    expect(userFound?.id).toBe(id)
  })

  test('Should update user', async () => {
    const userFound = await userRepository.get({ id })
    const currentUser = {
      id: userFound?.id,
      name: userFound?.name,
      email: userFound?.email,
      interests: userFound?.interests,
      updatedAt: userFound?.updatedAt,
    }
    const updateUser = {
      where: {
        id
      },
      data: {
        name: `name${dataGenerate()}`,
        email: `${dataGenerate()}@email.com`,
        interests: [dataGenerate(), dataGenerate()]
      }
    }
    await userRepository.update(updateUser)
    const updatedUser = await userRepository.get({ id })

    expect(currentUser.name).not.toEqual(updatedUser?.name)
    expect(currentUser.email).not.toEqual(updatedUser?.email)
    expect(currentUser.interests).not.toEqual(updatedUser?.interests)
    expect(currentUser.updatedAt).not.toEqual(updatedUser?.updatedAt)
  });

  test('Should delete one user', async () => {
    await userRepository.delete({ id })
    const userFound = await userRepository.get({ id })
    expect(userFound).toBeNull()
  })

})