import InvalidEmailError from "./errors/invalid-email"
import InvalidObjectError from "./errors/invalid-object"
import InvalidUUIDError from "./errors/invalid-uuid"
import Post from "./post"

export default class User {
  constructor(
    readonly id: string | undefined,
    readonly name: string,
    readonly email: string,
    readonly interests: Array<string>,
    readonly posts?: Array<Post>,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    if (!this.name) throw new InvalidObjectError("Invalid name field content: set a name")
    const regexEmail = /^\w+([.]\w+)*@\w+\.\w{2,8}(\.\w{2})?$/
    if (!regexEmail.test(this.email)) throw new InvalidEmailError()

    const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (this.interests && this.interests.length > 0) {
      for (let id of this.interests) {
        if (regexUUID.test(id) === false) throw new InvalidUUIDError("Invalid interest")
      }
    }
  }
}
