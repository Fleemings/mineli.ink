// Shared constants between frontend and backend

export const API_VERSION = 'v1';
export const API_BASE_PATH = '/api';

// Common timeouts
export const DEFAULT_API_TIMEOUT = 30000; // 30 seconds
export const DEFAULT_POOL_TIMEOUT = 5000; // 5 seconds

// Environment names
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  EMAIL_ALREADY_REGISTERED: 'This email is already registered',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_GOOGLE_TOKEN: 'Invalid Google token',
  TOKEN_NOT_PROVIDED: 'Token not provided',
  TOKEN_INVALID_PAYLOAD: 'Token has invalid payload',
  TOKEN_INVALID_OR_EXPIRED: 'Token is invalid or expired',
  VALIDATION_ERROR: 'Validation error',
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: 'Name must be at least 2 characters',
  NAME_MAX_LENGTH: 'Name must be at most 100 characters',
  EMAIL_INVALID: 'Invalid email',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  GOOGLE_TOKEN_REQUIRED: 'Google token is required',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_API_RESPONSE: 'Invalid API response',
} as const;
