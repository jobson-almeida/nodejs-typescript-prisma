import DeleteCampaign from "@/application/campaign/delete-campaign";
import GetCampaign from "@/application/campaign/get-campaign";
import GetCampaigns from "@/application/campaign/get-campaigns";
import SaveCampaign from "@/application/campaign/save-campaign";
import UpdateCampaign from "@/application/campaign/update-campaign";
import InvalidDateError from "@/domain/entities/errors/invalid-date";
import InvalidDateRangeError from "@/domain/entities/errors/invalid-date-range";
import InvalidObjectError from "@/domain/entities/errors/invalid-object";
import InvalidUUIDError from "@/domain/entities/errors/invalid-uuid";
import { Status } from "../http/errors/http-helper";
import NotFoundError from "../http/errors/not-found-error";
import { Http, Method } from "../http/Http";

type ParamsType = {
  id: string
}

type BodyType = {
  id?: string
  name: string
  text: string
  interests: Array<string>
  startTime: Date,
  endTime: Date,
  status: boolean
}

export default class CampaignController {
  constructor(
    readonly http: Http,
    readonly saveCampaign: SaveCampaign,
    readonly getCampaign: GetCampaign,
    readonly getCampaigns: GetCampaigns,
    readonly updateCampaign: UpdateCampaign,
    readonly deleteCampaign: DeleteCampaign
  ) {

    http.build(Method.POST, "/campaigns", async function (params: ParamsType, body: BodyType) {
      try {
        await saveCampaign.execute(body);
        return Status.created()
      } catch (error) {
        if (error instanceof InvalidObjectError) return Status.badRequest(error)
        if (error instanceof InvalidDateError) return Status.badRequest(error)
        if (error instanceof InvalidDateRangeError) return Status.badRequest(error)
        if (error instanceof InvalidUUIDError) return Status.badRequest(error)
        if (error instanceof NotFoundError) return Status.notFound(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });

    http.build(Method.GET, "/campaigns", async function () {
      try {
        const campaigns = await getCampaigns.execute();
        return Status.success(campaigns)
      } catch (error) {
        if (error instanceof InvalidDateError) return Status.badRequest(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });

    http.build(Method.GET, "/campaigns/:id", async function (params: ParamsType) {
      try {
        const campaign = await getCampaign.execute(params)
        return Status.success(campaign)
      } catch (error) {
        if (error instanceof NotFoundError) return Status.notFound(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });

    http.build(Method.PUT, "/campaigns/:id", async function (params: ParamsType, body: BodyType) {
      try {
        const { id } = params
        const { name, text, interests, startTime, endTime, status } = body
        await updateCampaign.execute({
          where: { id },
          data: { id, name, text, interests, startTime, endTime, status }
        })
        return Status.noContent()
      } catch (error) {
        if (error instanceof InvalidUUIDError) return Status.badRequest(error)
        if (error instanceof InvalidDateError) return Status.badRequest(error)
        if (error instanceof InvalidDateRangeError) return Status.badRequest(error)
        if (error instanceof InvalidObjectError) return Status.badRequest(error)
        if (error instanceof NotFoundError) return Status.notFound(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });

    http.build(Method.DELETE, "/campaigns/:id", async function (params: ParamsType) {
      try {
        await deleteCampaign.execute(params)
        return Status.noContent()
      } catch (error) {
        if (error instanceof NotFoundError) return Status.notFound(error)
        if (error instanceof Error) return Status.internalServerError()
      }
    });
  }
}