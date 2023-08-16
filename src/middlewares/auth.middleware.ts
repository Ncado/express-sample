import {NextFunction, Request, Response} from 'express';
import {JwtService} from "../modules/auth/jwt.service";

const jwtService = new JwtService();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.cookies.jwt;


        if (!token) {
            const authHeader = req.headers['authorization'];
            token = {token: authHeader && authHeader.split(' ')[1]};
        }


        if (token.length < 0) {
            return res.status(401).json({
                message: "FORMAT_ERROR",
                code: "FORMAT_ERROR",
                fields: {"token": "REQUIRED"}
            });
        }

        jwtService.verifyToken(token);

        next();

    } catch (error) {
        res.status(401).json({
            message: "FORMAT_ERROR",
            code: "FORMAT_ERROR",
            fields: {"token": "REQUIRED"}
        });
    }
}
