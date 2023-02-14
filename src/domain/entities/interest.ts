import InvalidObjectError from "./errors/invalid-object"
import Util from "./util"

export default class Interest {
  constructor(
    readonly id: string | undefined,
    readonly name: string,
    readonly active: boolean,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    if (!this.name) throw new InvalidObjectError("Invalid name field content: set a name")
    if (!Util.validateBoolean(this.active)) throw new InvalidObjectError("Invalid active field content: set true or false")
  }
}
