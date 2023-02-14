import InvalidObjectError from "./errors/invalid-object";
import InvalidUUIDError from "./errors/invalid-uuid";
import Util from "./util";

export default class Post {
  constructor(
    readonly id: string | undefined,
    readonly text: string,
    readonly authorId: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    if (!this.text) throw new InvalidObjectError("Invalid text field content: set a text")
    if (!Util.validateUUID(this.authorId)) throw new InvalidUUIDError("Invalid author field content: set a valid author")
  }
}
