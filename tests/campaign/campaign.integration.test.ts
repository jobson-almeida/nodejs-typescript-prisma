import Campaign from "@/domain/entities/campaign";
import CampaignRepositoryDatabaseInMemory from "@/infra/repository/memory/campaign-repository-in-memory";
import { randomUUID } from "crypto";
import { beforeAll, describe, expect, test } from "vitest";


describe('Integration test', () => {
    const campaignRepository = new CampaignRepositoryDatabaseInMemory();

    let id = ""
    let name = ""
    let text = ""
    let interests: string[] = []
    let status = false

    const now = new Date(Date.now())
    const numberOfMlSeconds = now.getTime();
    const addMlSeconds = (1 * 60) * 1000;
    const after = new Date(numberOfMlSeconds + addMlSeconds);

    beforeAll(async () => {
        const campaigns: Campaign[] = await campaignRepository.list()
        if (campaigns && campaigns.length > 0) {
            for (const data of campaigns) {
                await campaignRepository.delete({ id: data.id })
            }
        }
    })

    test('It should create and list an campaign', async () => {
        const input = {
            name: `name ${randomUUID()}`,
            text: `text ${randomUUID()}`,
            interests: [`${randomUUID()}`],
            startTime: now,
            endTime: after,
            status: true
        };

        const newCampaign = Campaign.create(input.name, input.text, input.interests, input.startTime, input.endTime, input.status)
        await campaignRepository.save(newCampaign)

        const campaignsFound = await campaignRepository.list()
        const [campaign] = campaignsFound
        id = campaign.id
        name = campaign.name
        text = campaign.text
        interests = campaign.interests
        status = campaign.status

        expect(campaignsFound).not.toBeNull()
        expect(campaignsFound).toHaveLength(1)
        expect(campaign.id).not.toBeUndefined();
        expect(input.name).toBe(name);
        expect(input.text).toBe(text);
        expect(campaign.interests).toBeInstanceOf(Array);
        expect(campaign.createdAt).not.toBeUndefined()
        expect(campaign.updatedAt).not.toBeUndefined()
    })

    test('Should get campaign from id', async () => {
        const campaignFound = await campaignRepository.get({ id })
        expect(campaignFound).not.toBeNull()
        expect(campaignFound?.name).toEqual(name)
        expect(campaignFound?.text).toEqual(text)
        expect(campaignFound?.interests).toEqual(interests)
        expect(campaignFound?.interests).toHaveLength(1)
    })

})