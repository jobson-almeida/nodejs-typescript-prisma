import InterestRepository from "../repository/interest-repository";
import UserRepository from "../repository/user-repository";
import PostRepository from "../repository/post-repository";
import CampaignRepository from "../repository/campaign-repository";

export default interface RepositoryFactory {
  createInterestRepository(): InterestRepository;
  createUserRepository(): UserRepository;
  createPostRepository(): PostRepository;
  createCampaignRepository(): CampaignRepository;
}