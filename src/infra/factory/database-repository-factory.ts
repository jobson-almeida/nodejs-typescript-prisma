import RepositoryFactory from "@/domain/factory/repository-factory";
import CampaignRepository from "@/domain/repository/campaign-repository";
import InterestRepository from "@/domain/repository/interest-repository";
import PostRepository from "@/domain/repository/post-repository";
import UserRepository from "@/domain/repository/user-repository";
import PrismaClientAdapter from "../database/prisma-client-adapter";
import CampaignRepositoryDatabase from "../repository/database/campaign-repository-database";
import InterestRepositoryDatabase from "../repository/database/interest-repository-database";
import PostRepositoryDatabase from "../repository/database/post-repository-database";
import UserRepositoryDatabase from "../repository/database/user-repository-database";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

	constructor(readonly prismaClientAdapter: PrismaClientAdapter) { }

	createUserRepository(): UserRepository {
		return new UserRepositoryDatabase(this.prismaClientAdapter);
	}

	createInterestRepository(): InterestRepository {
		return new InterestRepositoryDatabase(this.prismaClientAdapter);
	}

	createPostRepository(): PostRepository {
		return new PostRepositoryDatabase(this.prismaClientAdapter);
	}

	createCampaignRepository(): CampaignRepository {
		return new CampaignRepositoryDatabase(this.prismaClientAdapter);
	}

}