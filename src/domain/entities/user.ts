import InvalidEmailError from "./errors/invalid-email"
import InvalidObjectError from "./errors/invalid-object"
import InvalidUUIDError from "./errors/invalid-uuid"
import Util from "./util"

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

    if (!Util.validateString(this.name)) throw new InvalidObjectError("Invalid name field content: set a name")
    if (!Util.validateEmail(this.email)) throw new InvalidEmailError()
    if (this.interests.length === 0) throw new InvalidUUIDError("Invalid interest")
    for (let id of this.interests) {
      if (!Util.validateUUID(id)) throw new InvalidUUIDError("Invalid interest")
    }
  }

  static create(name: string, email: string, interests: string[]) {
    const userId = crypto.randomUUID();
    return new User(userId, name, email, interests);
  }

  public build(name: string, email: string, interests: string[]) {
    this.name = name
    this.email = email
    this.interests = interests
  }
}
