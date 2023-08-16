import {UsersService} from "../users/users.service";
import {CreateUserDataDto} from "./dto/create-user-data.dto";
import {Request, Response} from 'express';

const express = require('express');

const router = express.Router();
const usersService = new UsersService();

interface CreateUserRequest extends Request {
    body: CreateUserDataDto;
}

router.post('/', async (req: CreateUserRequest, res: Response) => {
    try {
        const user = await usersService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
export default router;
