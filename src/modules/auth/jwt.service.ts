import {authConfig} from "../../configs/auth.config";

import jwt from 'jsonwebtoken'

export class JwtService {

    createToken(payload: { userId: any }): string {
        const token = jwt.sign(payload, authConfig.jwtConfig.secret, {expiresIn: '121h'});
        return token;
    }

    verifyToken(token: { token: string }) {
        console.log("verify", token)
        try {
            const payload = jwt.verify(token.token, authConfig.jwtConfig.secret);
            return payload;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

}

