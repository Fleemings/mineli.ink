import { z } from 'zod';

export const validationErrorSchema = z.object({
  field: z.string().min(1),
  message: z.string().min(1),
});

export const apiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string().min(1),
  errors: z.array(validationErrorSchema).optional(),
});

export function apiSuccessResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
  });
}

export function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.union([apiSuccessResponseSchema(dataSchema), apiErrorResponseSchema]);
}

export const apiSuccessUnknownResponseSchema = apiSuccessResponseSchema(z.unknown());

export type ValidationError = z.infer<typeof validationErrorSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
