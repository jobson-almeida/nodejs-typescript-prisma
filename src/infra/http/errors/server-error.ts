export default class ServerError extends Error {
  constructor(message: string) {
    super("Internal server error")
    this.name = "ServerError"
  }
}
