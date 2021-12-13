import HttpException from "./HttpException"

export class AuthenticationException extends HttpException{
    constructor( message = "Authentication Error." ){
        super(message, 401 )
    }
}
