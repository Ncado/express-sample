import {UsersService} from "../users/users.service";
import {Request, Response} from 'express';
import {createUserValidation} from "./validation.rules";
import {validationResult} from "express-validator";

const express = require('express');

const router = express.Router();
const usersService = new UsersService();


router.post('/', createUserValidation, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({fields: errors.array()});
    }
    try {
        const user = await usersService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({
            message: err.message,
            code: err.code || 'UNKNOWN_ERROR',
            fields: err.fields || undefined
        });
    }
});
export default router;
