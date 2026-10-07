import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtClaims, UnauthorizedError, jwtPayloadSchema, ERROR_MESSAGES } from '@shared';

export interface AuthenticatedRequest extends Request {
    user?: JwtClaims;
}

export function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        throw new UnauthorizedError(ERROR_MESSAGES.TOKEN_NOT_PROVIDED);
    }

    const token = header.slice(7);

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        const payload = jwtPayloadSchema.safeParse(decoded);
        req.user = payload.data;
        next();
    } catch (err) {
        if (err instanceof UnauthorizedError) throw new UnauthorizedError(ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED);
        throw err;
    }
}