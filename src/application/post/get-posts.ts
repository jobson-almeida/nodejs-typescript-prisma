import Post from "@/domain/entities/post";
import RepositoryFactory from "@/domain/factory/repository-factory";
import PostRepository from "@/domain/repository/post-repository";

type Output = {
  id: string,
  text: string,
  authorId: string  
  createdAt: Date,
  updatedAt: Date
}

export default class GetPosts {
  postRepository: PostRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.postRepository = this.repositoryFactory.createPostRepository()
  }

  async execute(): Promise<Output[]> {
    const postsFound = await this.postRepository.list();
    const posts:Post[] = []
    for(const post of postsFound){
      posts.push(new Post(post.id, post.text, post.authorId, post.createdAt, post.updatedAt))
    }
    
    return posts.map(post => (
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
