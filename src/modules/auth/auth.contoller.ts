import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import {Request, Response} from 'express';
import {loginValidation} from "./validation.rules";
import {validationResult} from "express-validator";

const express = require('express');

const router = express.Router();
const authService = new AuthService()
const usersService = new UsersService();


router.post('/', loginValidation, async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({fields: errors.array()});
    }
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
