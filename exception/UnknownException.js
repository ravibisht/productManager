import HttpException from "./HttpException";

export default class UnknownException extends HttpException{
    constructor(message) {
        super(message,500)
    }
}