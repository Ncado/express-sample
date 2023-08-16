import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import {Request, Response} from 'express';
import {SessionDto} from "./dto/session.dto";

const express = require('express');

const router = express.Router();
const authService = new AuthService()
const usersService = new UsersService();

interface CreateSessionRequest extends Request {
    body: SessionDto;
}

router.post('/', async (req: CreateSessionRequest, res: Response) => {
    const {email, password} = req.body;
    try {
        const token = await authService.login(email, password);
        res.cookie('jwt', token, {httpOnly: true});
        res.json(token);
    } catch (err) {
        res.status(500).json({
            message: err.message,
            code: err.code || 'UNKNOWN_ERROR',
            fields: err.fields || undefined
        });
    }
});


export default router;
