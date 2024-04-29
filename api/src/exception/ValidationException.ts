import { error } from "console";

export default class ValidationException extends Error {
    constructor(errorMessage: string) {
        super(errorMessage);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
