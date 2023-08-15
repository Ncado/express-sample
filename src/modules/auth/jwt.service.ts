import {authConfig} from "../../configs/auth.config";

const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Replace with your secret key


export class JwtService {

    createToken(email) {
        const payload = {email};
        const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
        return token;
    }

    verifyToken(token) {
        try {
            const payload = jwt.verify(token, authConfig.jwtConfig.secret);
            return payload;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

}

