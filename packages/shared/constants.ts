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
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  INVALID_REQUEST: 'Invalid request',
  INTERNAL_ERROR: 'Internal server error',
} as const;

