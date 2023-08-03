import InvalidObjectError from "./errors/invalid-object";
import InvalidUUIDError from "./errors/invalid-uuid";
import crypto from "crypto";
import Util from "./util";

type User = {
  id: string
  name: string
  email: string
  interests: string[]
  createdAt: Date
  updatedAt: Date
}

export default class Post {
  text: string
  authorId: string
  createdAt: Date
  updatedAt: Date
  author: User

  constructor(
    readonly id: string,
    text: string,
    authorId: string | undefined | null,
    createdAt?: Date,
    updatedAt?: Date,
    author?: User | undefined | null
  ) {
    this.text = text
    this.authorId = authorId!
    this.createdAt = createdAt!
    this.updatedAt = updatedAt!
    this.author = author!
  }

  static create(text: string, authorId: string) {
    if (!Util.validateUUID(authorId)) throw new InvalidUUIDError("Invalid author field content: set a valid author")
    if (!text) throw new InvalidObjectError("Invalid text field content: set a text")
    const postId = crypto.randomUUID()
    return new Post(postId, text, authorId)
  }

  build(text: string, authorId: string) {
    if (!Util.validateUUID(this.authorId)) throw new InvalidUUIDError("Invalid author field content: set a valid author")
    this.text = text
    this.authorId = authorId
  }
}
