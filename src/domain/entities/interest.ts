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
    this.validate(name, active)
    
    this.name = name
    this.active = active
    this.createdAt = createdAt!
    this.updatedAt = updatedAt!
  }

  private validate(name: string, active: boolean) {
    if (!name) throw new InvalidObjectError("Invalid name field content: set a name")
    if (!Util.validateBoolean(active)) throw new InvalidObjectError("Invalid active field content: set true or false")
  }
  
  static create(name: string, active: boolean) {
    const interestId = crypto.randomUUID();
    return new Interest(interestId, name, active);
  }

  build(name: string, active: boolean) { 
    this.validate(name, active)
    this.name = name
    this.active = active
  }
}
