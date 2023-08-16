import {check} from 'express-validator';

export const createMovieValidationRules = [
    check('title').trim().notEmpty().isString().withMessage('Title must be a string'),
    check('year').isNumeric().custom((value, {req}) => {
        if (value < 1800 || value > 2023) {
            throw new Error('Year must be between 1800 and the current year');
        }
        return true;
    }).withMessage('Year must be a numeric value'),
    check('format').isIn(['VHS', 'DVD', 'Blu-Ray']).withMessage('Invalid format'),
    check('actors').isArray().withMessage('Actors must be an array'),
    check('actors.*').trim().notEmpty().isString().withMessage('Each actor must be a string')
];


export const MovieValidationRules = [
    check('title').trim().notEmpty().isString().withMessage('Title must be a string'),
    check('year').isNumeric().custom((value, {req}) => {
        if (value < 1800 || value > 2023) {
            throw new Error('Year must be between 1800 and the current year');
        }
        return true;
    }).withMessage('Year must be a numeric value'), check('format').isIn(['VHS', 'DVD', 'Blu-Ray']).withMessage('Invalid format'),
    check('actors').isArray().withMessage('Actors must be an array'),
    check('actors.*').trim().notEmpty().isString().withMessage('Each actor must be a string')
];
