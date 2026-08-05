import { ERROR_MESSAGES, ValidationError, HTTP_STATUS } from '@shared';

export class AppError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly errors?: ValidationError[],
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(HTTP_STATUS.CONFLICT, message);
        this.name = 'ConflictError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = ERROR_MESSAGES.INVALID_CREDENTIALS) {
        super(HTTP_STATUS.UNAUTHORIZED, message);
        this.name = 'UnauthorizedError';
    }
}

export class ValidationFailedError extends AppError {
    constructor(errors: ValidationError[]) {
        super(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.VALIDATION_ERROR, errors);
        this.name = 'ValidationFailedError';
    }
}
