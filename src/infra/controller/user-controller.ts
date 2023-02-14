import DeleteUser from "@/application/user/delete-user";
import GetUser from "@/application/user/get-user";
import GetUsers from "@/application/user/get-users";
import SaveUser from "@/application/user/save-user";
import UpdateUser from "@/application/user/update-user";
import { Status as status } from "../http/errors/http-helper";
import { Http, Method } from "../http/Http";
import InvalidEmailError from "@/domain/entities/errors/invalid-email";
import EmailExistsError from "../http/errors/email-exists";
import InactiveInterestError from "../http/errors/inactive-interest";
import NotFoundError from "../http/errors/not-found-error";
import InvalidUUIDError from "@/domain/entities/errors/invalid-uuid";

type ParamsType = {
  id: string
}

type BodyType = {
  name: string
  email: string
  interests: Array<string>
  // posts?: Array<Post>
}

export default class UserController {
  constructor(
    readonly http: Http,
    readonly saveUser: SaveUser,
    readonly getUser: GetUser,
    readonly getUsers: GetUsers,
    readonly updateUser: UpdateUser,
    readonly deleteUser: DeleteUser
  ) {

    http.build(Method.POST, "/users", async function (params: ParamsType, body: BodyType) {
      try {
        await saveUser.execute(body);
        return status.created()
      } catch (error) {
        if (error instanceof InvalidEmailError) return status.badRequest(error)
        if (error instanceof InvalidUUIDError) return status.badRequest(error)
        if (error instanceof EmailExistsError) return status.conflict(error)
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof InactiveInterestError) return status.badRequest(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.GET, "/users", async function () {
      try {
        const usersFound = await getUsers.execute();
        return status.success(usersFound)
      } catch (error) {
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.GET, "/users/:id", async function (params: ParamsType) {
      try {
        const { id } = params
        const userFound = await getUser.execute({ id })
        return status.success(userFound)
      } catch (error) {
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.PUT, "/users/:id", async function (params: ParamsType, body: BodyType) {
      try {
        const { id } = params
        const { name, email, interests } = body
        await updateUser.execute({
          where: { id },
          data: { name, email, interests }
        })
        return status.noContent()
      } catch (error) {
        if (error instanceof InvalidEmailError) return status.badRequest(error)
        if (error instanceof InvalidUUIDError) return status.badRequest(error)
        if (error instanceof EmailExistsError) return status.badRequest(error)
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.DELETE, "/users/:id", async function (params: ParamsType, body: BodyType) {
      try {
        await deleteUser.execute(params)
        return status.noContent()
      } catch (error) {
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });
  }
}
