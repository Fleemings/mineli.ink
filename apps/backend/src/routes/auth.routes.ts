import { Router, Request, Response, NextFunction } from 'express';
import {apiSuccessResponseSchema, authPayloadSchema, HTTP_STATUS, registerSchema, loginSchema, googleLoginSchema} from '@shared';
import { AuthService } from '../services/auth/auth.service';
import { validate } from '../middleware';

const router = Router();
const authService = new AuthService();

router.post(
    '/register',
    validate(registerSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await authService.register(req.body);
            const response = apiSuccessResponseSchema(authPayloadSchema).parse({ success: true, data: result });
            res.status(HTTP_STATUS.CREATED).json(response);
        } catch (err) {
            next(err);
        }
    },
);

router.post(
    '/login',
    validate(loginSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await authService.login(req.body);
            const response = apiSuccessResponseSchema(authPayloadSchema).parse({ success: true, data: result });
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err) {
            next(err);
        }
    },
);

router.post(
    '/google',
    validate(googleLoginSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await authService.googleLogin(req.body);
            const response = apiSuccessResponseSchema(authPayloadSchema).parse({ success: true, data: result });
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err) {
            next(err);
        }
    },
);

export default router;
