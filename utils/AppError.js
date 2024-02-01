export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Calling the constructor of the Error class
        this.name = 'AppError'; // Custom name for your error type
        this.statusCode = statusCode || 500; // Default status code is 500 (Internal Server Error)
        this.isOperational = true; // Indicates whether the error is operational (e.g., caused by a user) or a bug in the code
    }
}