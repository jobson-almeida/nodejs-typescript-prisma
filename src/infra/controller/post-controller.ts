import DeletePost from "@/application/post/delete-post";
import GetPost from "@/application/post/get-post";
import GetPosts from "@/application/post/get-posts";
import SavePost from "@/application/post/save-post";
import UpdatePost from "@/application/post/update-post";
import InvalidObjectError from "@/domain/entities/errors/invalid-object";
import { Status, Status as status } from "../http/errors/http-helper";
import NotFoundError from "../http/errors/not-found-error";
import { Http, Method } from "../http/Http";

type ParamsProps = {
  id: string
}

type BodyProps = {
  id?: string
  text: string
  authorId: string
}

export default class PostController {
  constructor(
    readonly http: Http,
    readonly savePost: SavePost,
    readonly getPost: GetPost,
    readonly getPosts: GetPosts,
    readonly updatePost: UpdatePost,
    readonly deletePost: DeletePost
  ) {

    http.build(Method.POST, "/posts", async function (params: ParamsProps, body: BodyProps) {
      try {
        await savePost.execute(body);
        return status.created()
      } catch (error) {
        if (error instanceof Error) {
          if (error instanceof InvalidObjectError) return status.badRequest(error)
          if (error instanceof NotFoundError) return status.notFound(error)
          if (error instanceof Error) return status.internalServerError()
        }
      }
    });

    http.build(Method.GET, "/posts", async function () {
      try {
        const posts = await getPosts.execute();
        return status.success(posts)
      } catch (error) {
        if (error instanceof Error) return Status.internalServerError()
      }
    });

    http.build(Method.GET, "/posts/:id", async function (params: ParamsProps) {
      try {
        const { id } = params
        const post = await getPost.execute({ id })
        return status.success(post)
      } catch (error) {
        if (error instanceof NotFoundError) return Status.notFound(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });

    http.build(Method.PUT, "/posts/:id", async function (params: ParamsProps, body: BodyProps) {
      try {
        const { id } = params
        const { text, authorId } = body
        await updatePost.execute({
          where: { id },
          data: { text, authorId }
        })
        return status.noContent()
      } catch (error) {
        if (error instanceof InvalidObjectError) return status.badRequest(error)
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.DELETE, "/posts/:id", async function (params: ParamsProps) {
      try {
        const { id } = params
        await deletePost.execute({ id })
        return status.noContent()
      } catch (error) {
        if (error instanceof NotFoundError) return Status.notFound(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });
  }
}