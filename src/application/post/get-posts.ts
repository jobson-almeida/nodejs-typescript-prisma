import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository";

type Output = {
  id?: string,
  text: string,
  authorId: string,
  createdAt?: Date,
  updatedAt?: Date
}

export default class GetPosts {
  postRepository: PostRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = repositoryFactory.createPostRepository()
  }

  async execute(): Promise<Output[]> {
    const postsFound = await this.postRepository.list();
    return postsFound.map(post => (
      {
        id: post.id,
        text: post.text,
        authorId: post.authorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }
    ))
  }
}  
