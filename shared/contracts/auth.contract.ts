import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants';

export const registerSchema = z.object({
  name: z
    .string({ error: ERROR_MESSAGES.NAME_REQUIRED })
    .trim()
    .min(2, ERROR_MESSAGES.NAME_MIN_LENGTH)
    .max(100, ERROR_MESSAGES.NAME_MAX_LENGTH),
  email: z
    .email(ERROR_MESSAGES.EMAIL_INVALID)
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: ERROR_MESSAGES.PASSWORD_REQUIRED })
    .min(8, ERROR_MESSAGES.PASSWORD_MIN_LENGTH),
});

export const loginSchema = z.object({
  email: z
    .email(ERROR_MESSAGES.EMAIL_INVALID)
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: ERROR_MESSAGES.PASSWORD_REQUIRED })
    .min(10, ERROR_MESSAGES.PASSWORD_REQUIRED),
});

export const googleLoginSchema = z.object({
  idToken: z
    .string({ error: ERROR_MESSAGES.GOOGLE_TOKEN_REQUIRED })
    .min(1, ERROR_MESSAGES.GOOGLE_TOKEN_REQUIRED),
});

export const authUserSchema = z.object({
  name: z.string().min(1),
  email: z
    .email(ERROR_MESSAGES.EMAIL_INVALID)
    .trim()
    .toLowerCase(),
  password: z
      .string({ error: ERROR_MESSAGES.PASSWORD_REQUIRED })
      .min(8, ERROR_MESSAGES.PASSWORD_MIN_LENGTH),
});

export const authPayloadSchema = z.object({
  token: z.string().min(1),
  user: authUserSchema,
});

export const jwtPayloadSchema = z.object({
  userId: z.string().min(1),
  email: z.email(),
});

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type GoogleLoginRequest = z.infer<typeof googleLoginSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthResponse = z.infer<typeof authPayloadSchema>;
export type JwtClaims = z.infer<typeof jwtPayloadSchema>;
