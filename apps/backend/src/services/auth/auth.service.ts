import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User, IUser } from '../../models/User';
import { config } from '../../config';
import {
    AuthResponse,
    RegisterRequest,
    JwtClaims,
    ConflictError,
    UnauthorizedError,
    LoginRequest, GoogleLoginRequest, AuthUser,
    ERROR_MESSAGES
} from '@shared';

export class AuthService {
    private googleClient: OAuth2Client;

    constructor() {
        this.googleClient = new OAuth2Client(config.google.clientId);
    }

    async register(input: RegisterRequest): Promise<AuthResponse> {
        const existing = await User.findOne({ email: input.email.toLowerCase() });
        if (existing) {
            throw new ConflictError(ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED);
        }

        const hashedPassword = await bcrypt.hash(input.password, config.bcrypt.rounds);

        const user = await User.create({
            name: input.name,
            email: input.email.toLowerCase(),
            password: hashedPassword,
        });

        const token = this.signToken(user);
        return { token, user: this.toDTO(user) };
    }

    async login(input: LoginRequest): Promise<AuthResponse> {
        const user = await User.findOne({ email: input.email.toLowerCase() });
        if (!user || !user.password) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const isValid = await bcrypt.compare(input.password, user.password);
        if (!isValid) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const token = this.signToken(user);
        return { token, user: this.toDTO(user) };
    }

    async googleLogin(input: GoogleLoginRequest): Promise<AuthResponse> {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: input.idToken,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new UnauthorizedError(ERROR_MESSAGES.INVALID_GOOGLE_TOKEN);
        }

        let user = await User.findOne({ email: payload.email });

        if (!user) {
            user = await User.create({
                name: payload.name || payload.email.split('@')[0],
                email: payload.email,
                googleId: payload.sub,
            });
        } else if (!user.googleId) {
            user.googleId = payload.sub;
            await user.save();
        }

        const token = this.signToken(user);
        return { token, user: this.toDTO(user) };
    }

    private signToken(user: IUser): string {
        const payload: JwtClaims = {
            userId: user._id!.toString(),
            email: user.email,
        };
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        } as jwt.SignOptions);
    }

    private toDTO(user: IUser): AuthUser {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}