import DeleteInterest from "@/application/interest/delete-interest";
import GetInterest from "@/application/interest/get-interest";
import GetInterests from "@/application/interest/get-interests";
import SaveInterest from "@/application/interest/save-interest";
import UpdateInterest from "@/application/interest/update-interest";
import InvalidObjectError from "@/domain/entities/errors/invalid-object";
import { Status as status } from "../http/errors/http-helper";
import InterestExistsError from "../http/errors/interest-exists";
import NotFoundError from "../http/errors/not-found-error";
import { Http, Method } from "../http/Http";
import CheckParams from "./check-params";

type ParamsProps = {
  unique?: string
  id?: string
  name?: string
}

type BodyProps = {
  name: string
  active: boolean
}

export default class InterestController {
  constructor(
    readonly http: Http,
    readonly saveInterest: SaveInterest,
    readonly getInterest: GetInterest,
    readonly getInterests: GetInterests,
    readonly updateInterest: UpdateInterest,
    readonly deleteInterest: DeleteInterest
  ) {

    http.build(Method.POST, "/interests", async function (params: ParamsProps, body: BodyProps) {
      try {
        await saveInterest.execute(body);
        return status.created()
      } catch (error) {
        if (error instanceof InvalidObjectError) return status.badRequest(error)
        if (error instanceof InterestExistsError) return status.conflict(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.GET, "/interests", async function (params?: string[]) {
      try {
        const interestsFound = await getInterests.execute(params);
        return status.success(interestsFound)
      } catch (error) {
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.GET, "/interests/:unique", async function (params: ParamsProps) {
      let paramsChecked = {}
      try {
        if (params.unique) {
          paramsChecked = CheckParams.validade(params.unique)
        }
        const interestFound = await getInterest.execute(paramsChecked)
        return status.success(interestFound)
      } catch (error) {
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.PUT, "/interests/:unique", async function (params: ParamsProps, body: BodyProps) {
      const { name, active } = body
      let paramsChecked = {}
      try {
        if (params.unique) {
          paramsChecked = CheckParams.validade(params.unique)
        }
        await updateInterest.execute({ where: paramsChecked, data: { name, active } })
        return status.noContent()
      } catch (error) {
        if (error instanceof InvalidObjectError) return status.badRequest(error)
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof InterestExistsError) return status.conflict(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });

    http.build(Method.DELETE, "/interests/:id", async function (params: ParamsProps) {
      try {
        await deleteInterest.execute({ id: params.id })
        return status.noContent()
      } catch (error) {
        if (error instanceof NotFoundError) return status.notFound(error)
        if (error instanceof Error) return status.internalServerError()
      }
    });
  }
}