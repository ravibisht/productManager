export default class HttpException extends Error {
    constructor(message, statusCode) {
        super(message)
    }
}