import InvalidEmailError from "./errors/invalid-email"
import InvalidObjectError from "./errors/invalid-object"
import InvalidUUIDError from "./errors/invalid-uuid"

type Post = {
  id: string
  text: string
  authorId?: string | null | undefined
  createdAt: Date
  updatedAt: Date
}

export default class User {

  name: string
  email: string
  interests: string[]
  posts: Post[]
  createdAt: Date
  updatedAt: Date

  constructor(
    readonly id: string,
    name: string,
    email: string,
    interests: string[],
    posts?: Post[] | null | undefined,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (!posts || posts === undefined) {
      console.log('a')
      this.name = name
      this.email = email
      this.interests = interests
      this.createdAt = createdAt!
      this.updatedAt = updatedAt!
    } else {
      console.log('b')
      this.name = name
      this.email = email
      this.interests = interests
      this.posts = posts!
      this.createdAt = createdAt!
      this.updatedAt = updatedAt!
    }

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

  static create(name: string, email: string, interests: string[]) {
    const userId = crypto.randomUUID();
    return new User(userId, name, email, interests);
  }

  public build(name: string, email: string, interests: string[]) {
    const regexEmail = /^\w+([.]\w+)*@\w+\.\w{2,8}(\.\w{2})?$/
    if (!regexEmail.test(email)) throw new InvalidEmailError()
    this.name = name
    this.email = email
    this.interests = interests
  }
}
