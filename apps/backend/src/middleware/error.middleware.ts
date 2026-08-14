import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {ValidationFailedError} from "@shared";


export function validate(schema: z.ZodType) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            throw new ValidationFailedError(errors);
        }
        if(result.success){
            req.body = result.data;
            next();
        }
    };
}