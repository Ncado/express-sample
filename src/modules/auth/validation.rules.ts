import {check} from 'express-validator';


export const loginValidation = [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').trim().notEmpty().isLength({min: 8}).withMessage('Must be at least 8 characters long'),
];