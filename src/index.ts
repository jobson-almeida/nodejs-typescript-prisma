import '../module-alias'
import DeleteCampaign from './application/campaign/delete-campaign';
import GetCampaign from './application/campaign/get-campaign';
import GetCampaigns from './application/campaign/get-campaigns';
import SaveCampaign from './application/campaign/save-campaign';
import UpdateCampaign from './application/campaign/update-campaign';
import DeleteInterest from './application/interest/delete-interest';
import GetInterest from './application/interest/get-interest';
import GetInterests from './application/interest/get-interests';
import SaveInterest from './application/interest/save-interest';
import UpdateInterest from './application/interest/update-interest';
import DeletePost from './application/post/delete-post';
import GetPost from './application/post/get-post';
import GetPosts from './application/post/get-posts';
import SavePost from './application/post/save-post';
import UpdatePost from './application/post/update-post';
import DeleteUser from './application/user/delete-user';
import GetUser from './application/user/get-user';
import GetUsers from './application/user/get-users';
import SaveUser from './application/user/save-user';
import UpdateUser from './application/user/update-user';
import CampaignController from './infra/controller/campaign-controller';
import InterestController from './infra/controller/interest-controller';
import PostController from './infra/controller/post-controller';
import UserController from './infra/controller/user-controller';
import PrismaClientAdapter from './infra/database/prisma-client-adapter';
import DatabaseRepositoryFactory from './infra/factory/database-repository-factory';
import ExpressAdapter from './infra/http/ExpressAdapter';

const http = new ExpressAdapter();
const prismaClientAdapter = new PrismaClientAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(prismaClientAdapter)

const saveInterest = new SaveInterest(repositoryFactory);
const getInterest = new GetInterest(repositoryFactory);
const getInterests = new GetInterests(repositoryFactory);
const updateInterest = new UpdateInterest(repositoryFactory);
const deleteInterest = new DeleteInterest(repositoryFactory);
new InterestController(http, saveInterest, getInterest, getInterests, updateInterest, deleteInterest);

const saveUser = new SaveUser(repositoryFactory);
const getUser = new GetUser(repositoryFactory);
const getUsers = new GetUsers(repositoryFactory);
const updateUser = new UpdateUser(repositoryFactory);
const deleteUser = new DeleteUser(repositoryFactory);
new UserController(http, saveUser, getUser, getUsers, updateUser, deleteUser);

const savePost = new SavePost(repositoryFactory);
const getPost = new GetPost(repositoryFactory);
const getPosts = new GetPosts(repositoryFactory);
const updatePost = new UpdatePost(repositoryFactory);
const deletePost = new DeletePost(repositoryFactory);
new PostController(http, savePost, getPost, getPosts, updatePost, deletePost);

const saveCampaign = new SaveCampaign(repositoryFactory)
const getCampaign = new GetCampaign(repositoryFactory)
const getCampaigns = new GetCampaigns(repositoryFactory)
const updateCampaign = new UpdateCampaign(repositoryFactory)
const deleteCampaign = new DeleteCampaign(repositoryFactory)
new CampaignController(http, saveCampaign, getCampaign, getCampaigns, updateCampaign, deleteCampaign);

http.listen(3000);