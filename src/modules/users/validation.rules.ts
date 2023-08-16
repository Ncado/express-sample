import {check} from 'express-validator';


export const createUserValidation = [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('name').isLength({min: 2}).trim().notEmpty().withMessage('Must be at least 2 characters long'),
    check('password').isLength({min: 8}).trim().notEmpty().withMessage('Must be at least 8 characters long'),
    check('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
];