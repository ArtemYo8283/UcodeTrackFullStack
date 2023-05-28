import { body } from 'express-validator';

export const checkCategoryChainMethod = [
    body('title')
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ min: 1, max: 24 })
        .withMessage('invalid format of category title, should be a string 1-24 char'),
    body('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('should be a string')
        .isLength({ min: 5, max: 500 })
        .withMessage('Length 5-500')
];