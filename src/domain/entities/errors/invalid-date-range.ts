export default class InvalidDateRangeError extends Error {
  constructor() {
    super("Invalid date range")
    this.name = "InvalidDateRangeError"
  }
}
