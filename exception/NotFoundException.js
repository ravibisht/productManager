import HttpException from "./HttpException"

export default class NotFoundException extends HttpException {
  constructor(message = "API Not Found") {
    super(message, 404)
  }
}