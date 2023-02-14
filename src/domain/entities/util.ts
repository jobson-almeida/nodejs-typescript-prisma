export default class Util {
  static validateDate(value: Date): boolean {
    const date = new Date(value);
    return !isNaN(date.getDate())
  }

  static validateBoolean(value: any): boolean {
    if (value === true) return true
    if (value === false) return true
    return false
  }

  static validateUUID(value: string): boolean {
    const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return regexUUID.test(value)
  }

}