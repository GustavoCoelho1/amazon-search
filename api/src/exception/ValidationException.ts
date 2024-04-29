//Exception made for distinguish generic application Errors from in-code validations
export default class ValidationException extends Error {
    constructor(errorMessage: string) {
        super(errorMessage);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
