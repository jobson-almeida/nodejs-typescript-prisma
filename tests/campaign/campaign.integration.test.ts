import { randomUUID } from "crypto";
import PrismaClientAdapter from "@/infra/database/prisma-client-adapter";
import CampaignRepositoryDatabase from "@/infra/repository/database/campaign-repository-database";
import CampaignRepositoryDatabaseInMemory from "@/infra/repository/memory/campaign-repository-in-memory";
import { describe, test, expect, beforeEach } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
}

const prismaClientAdapter = new PrismaClientAdapter();
//const campaignRepository = new CampaignRepositoryDatabase(prismaClientAdapter);
const campaignRepository = new CampaignRepositoryDatabaseInMemory();
let id = ""

describe.skip('Campaign integration', () => {
  let now: Date
  let numberOfMlSeconds: number
  let addMlSeconds: number
  let after: Date

  beforeEach(() => {
    now = new Date(Date.now())
    numberOfMlSeconds = now.getTime();
    addMlSeconds = (1 * 60) * 1000;
    after = new Date(numberOfMlSeconds + addMlSeconds);
  })

  test('Should create campaign', async () => {
    const input = {
      name: `name ${dataGenerate()}`,
      text: `text ${dataGenerate()}`,
      interests: ["6a61b062-ba16-44c1-b7a7-44bbfb2a8785"],
      startTime: now,
      endTime: after,
      status: true,
    }
    await campaignRepository.save(input)
    const campaignsFound = await campaignRepository.list()
    const [campaign] = campaignsFound
    id = campaign.id

    expect(campaignsFound).not.toBeNull()
    expect(campaignsFound).toHaveLength(1)
    expect(input.name).toBe(campaign.name);
    expect(input.text).toBe(campaign.text);
    expect(input.interests).toStrictEqual(campaign.interests);
    expect(input.startTime).toStrictEqual(campaign.startTime);
    expect(input.endTime).toStrictEqual(campaign.endTime);
    expect(input.status).toBe(campaign.status);
  });

  test('Should check campaign exists', async () => {
    const existsCampaign = await campaignRepository.check({ id })
    expect(existsCampaign).toBeTruthy()
  })

  test('Should check campaign not exists', async () => {
    const existsCampaign = await campaignRepository.check({ id: "123456" })
    expect(existsCampaign).toBeFalsy()
  })

  test('Should get campaign', async () => {
    const campaignFound = await campaignRepository.get({ id })
    expect(campaignFound).not.toBeNull()
    expect(campaignFound?.id).toBe(id)
  });

  test('Should update campaign', async () => {
    const currentData = await campaignRepository.get({ id })
    const currentCampaign = {
      name: currentData?.name,
      text: currentData?.text,
      interests: currentData?.interests,
      startTime: currentData?.startTime,
      endTime: currentData?.endTime,
      status: currentData?.status
    }
    const updateCampaign = {
      where: { id },
      data: {
        name: `name ${dataGenerate()}`,
        text: `text ${dataGenerate()}`,
        interests: [dataGenerate(), dataGenerate()],
        startTime: now,
        endTime: after,
        status: true,
      }
    }
    await campaignRepository.update(updateCampaign)
    const updatedCampaign = await campaignRepository.get({ id })

    expect(currentCampaign?.name).not.toBe(updatedCampaign?.name)
    expect(currentCampaign?.text).not.toBe(updatedCampaign?.text)
    expect(currentCampaign?.interests).not.toStrictEqual(updatedCampaign?.interests)
    expect(currentCampaign?.startTime).not.toStrictEqual(updatedCampaign?.startTime)
    expect(currentCampaign?.endTime).not.toStrictEqual(updatedCampaign?.endTime)
  });

  test("Should delete campaign", async () => {
    await campaignRepository.delete({ id })
    const existsCampaign = await campaignRepository.check({ id })
    expect(existsCampaign).toBeFalsy()
  })

});