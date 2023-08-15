import {UsersService} from "../users/users.service";
import {PasswordService} from "../../utils/password.service";
import {authConfig} from "../../configs/auth.config";
import jwt from 'jsonwebtoken';

const express = require('express');

const router = express.Router();
const passwordService = new PasswordService();

const usersService = new UsersService();
router.post('/register', async (req, res) => {
    try {
        const user = await usersService.createUser(req.body);
        res.status(201).json({message: 'User registered successfully', userId: user.id});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await usersService.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isPasswordValid = await passwordService.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({userId: user.id}, authConfig.jwtConfig.secret, {expiresIn: '1h'});

        res.cookie('jwt', token, {httpOnly: true});
        res.json({message: 'Login successful'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


export default router;
