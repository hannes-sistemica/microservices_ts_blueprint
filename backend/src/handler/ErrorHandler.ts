// FIXME: make something, maybe use an error handler to catch all exceptions
class ErrorHandler  {
    statusCode: number;
    message: string;
    constructor(status: number, message: string) {
        this.statusCode = status;
        this.message = message;
    }
}

export default ErrorHandler;