export default class InterestExistsError extends Error {
  constructor() {
    super("Interest already exists")
    this.name = "InterestExistsError"
  }
}
