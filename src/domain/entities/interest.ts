import InvalidObjectError from "./errors/invalid-object"
import Util from "./util"
import crypto from "crypto";

export default class Interest {
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    readonly id: string,
    name: string,
    active: boolean,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.name = name.trim()
    this.active = active
    this.createdAt = createdAt!
    this.updatedAt = updatedAt!
  }

  static create(name: string, active: boolean) {
    if (!Util.validateString(name.trim())) throw new InvalidObjectError("Invalid name field content: review name format")
    const interestId = crypto.randomUUID();
    return new Interest(interestId, name.trim(), active);
  }

  build(name: string, active: boolean) {
    if (!Util.validateString(name)) throw new InvalidObjectError("Invalid name field content: review name format")
    if (!Util.validateBoolean(active)) throw new InvalidObjectError("Invalid active field content: set true or false")
    this.name = name.trim()
    this.active = active
  }
}
