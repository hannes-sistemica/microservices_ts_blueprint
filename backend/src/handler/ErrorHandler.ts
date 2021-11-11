class ErrorHandler  {
    statusCode: number;
    message: string;
    constructor(status: number, message: string) {
        this.statusCode = status;
        this.message = message;
    }
}

export default ErrorHandler;