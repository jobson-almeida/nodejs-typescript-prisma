export default class InactiveInterestError extends Error {
  constructor() {
    super("Inactive interest")
    this.name = "InactiveInterestError"
  }
}
