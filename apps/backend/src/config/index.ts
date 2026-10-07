import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const config = {
    port: Number.parseInt(getEnv('PORT'), 10),
    mongoUri: getEnv('MONGODB_URI'),
    jwt: {
        secret: getEnv('JWT_SECRET'),
        expiresIn: getEnv('JWT_EXPIRATION'),
    },
    google: {
        clientId: getEnv('GOOGLE_CLIENT_ID'),
    },
    cors: {
        origin: getEnv('CORS_ORIGIN'),
    },
    bcrypt: {
        rounds: Number.parseInt(getEnv('BCRYPT_ROUNDS'), 10),
    },
} as const;