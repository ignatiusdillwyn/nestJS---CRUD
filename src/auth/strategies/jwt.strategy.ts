// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
    userId: number;      // user id
    email: string;
    fullName: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secret-key-default',
        });
    }

    async validate(payload: JwtPayload) {
        // nilai yang di-return akan tersedia di req.user
        return { userId: payload.userId, email: payload.email, fullName: payload.fullName };
    }
}