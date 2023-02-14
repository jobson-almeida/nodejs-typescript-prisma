import InvalidDateError from "./errors/invalid-date"
import InvalidDateRangeError from "./errors/invalid-date-range"
import InvalidObjectError from "./errors/invalid-object"
import InvalidUUIDError from "./errors/invalid-uuid"
import Util from "./util"

export default class Campaign {
  constructor(
    readonly id: string | undefined,
    readonly name: string,
    readonly text: string,
    readonly interests: Array<string>,
    readonly startTime: Date,
    readonly endTime: Date,
    readonly status: boolean,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (this.interests && this.interests.length > 0) {
      for (let id of this.interests) {
        if (regexUUID.test(id) === false) throw new InvalidUUIDError("Invalid interest")
      }
    }
    if (!this.name) throw new InvalidObjectError("Invalid name field content: set a name")
    if (!this.text) throw new InvalidObjectError("Invalid text field content: set a text")
    if (this.interests.length === 0) throw new InvalidObjectError("Invalid interest field content: set a interest")
    if (Util.validateDate(this.startTime) === false) throw new InvalidDateError()
    if (Util.validateDate(this.endTime) === false) throw new InvalidDateError()
    if (this.endTime < this.startTime) throw new InvalidDateRangeError()
    if (!Util.validateBoolean(this.status)) throw new InvalidObjectError("Invalid active field content: set true or false")
  }
}
