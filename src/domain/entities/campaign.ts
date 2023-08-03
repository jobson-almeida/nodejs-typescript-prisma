import InvalidDateError from "./errors/invalid-date"
import InvalidDateRangeError from "./errors/invalid-date-range"
import InvalidObjectError from "./errors/invalid-object"
import InvalidUUIDError from "./errors/invalid-uuid"
import crypto from "crypto";
import Util from "./util"

export default class Campaign {
  name: string
  text: string
  interests: string[]
  startTime: Date
  endTime: Date
  status: boolean
  createdAt?: Date
  updatedAt?: Date

  constructor(
    readonly id: string,
    name: string,
    text: string,
    interests: string[],
    startTime: Date,
    endTime: Date,
    status: boolean,
    createdAt?: Date,
    updatedAt?: Date
  ) {

    const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (interests && interests.length > 0) {
      for (let id of interests) {
        if (regexUUID.test(id) === false) throw new InvalidUUIDError("Invalid interest")
      }
    } 
    this.validate(name, text, interests, startTime, endTime, status)

    this.name = name
    this.text = text
    this.interests = interests
    this.startTime = startTime
    this.endTime = endTime
    this.status = status
    this.createdAt = createdAt!
    this.updatedAt = updatedAt!
  }

  private validate(name: string, text: string, interests: string[], startTime: Date, endTime: Date, status: boolean){
    if (!name) throw new InvalidObjectError("Invalid name field content: set a name")
    if (!text) throw new InvalidObjectError("Invalid text field content: set a text")
    if (interests.length === 0) throw new InvalidObjectError("Invalid interest field content: set a interest")
    if (Util.validateDate(startTime) === false) throw new InvalidDateError()
    if (Util.validateDate(endTime) === false) throw new InvalidDateError()
    if (endTime < startTime) throw new InvalidDateRangeError()
    if (!Util.validateBoolean(status)) throw new InvalidObjectError("Invalid active field content: set true or false")
  }

  static create(name: string, text: string, interests: string[], startTime: Date, endTime: Date, status: boolean) {
    const campaignId = crypto.randomUUID()
    return new Campaign(campaignId, name, text, interests, startTime, endTime, status)
  }

  build(name: string, text: string, interests: string[], startTime: Date, endTime: Date, status: boolean){
    this.validate(name, text, interests, startTime, endTime, status)
    this.name = name
    this.text = text
    this.interests = interests
    this.startTime = startTime
    this.endTime = endTime
    this.status = status
  }
}
