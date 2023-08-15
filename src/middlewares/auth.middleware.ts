import {NextFunction, Request, Response} from 'express';
import {JwtService} from "../modules/auth/jwt.service";

const jwtService = new JwtService();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.jwt;

        console.log(token)
        console.log("token--->", req.cookies)

        if (token.length < 0) {
            console.log("token.length < 0", token.length < 0)
            return res.status(401).json({message: 'Unauthorized'});
        }

        jwtService.verifyToken(token);
        //req.userId = decoded.userId; // Attach the decoded userId to the request

        next(); // Allow access to the endpoint

    } catch (error) {
        res.status(401).json({message: 'Unauthorized'});
    }
}
