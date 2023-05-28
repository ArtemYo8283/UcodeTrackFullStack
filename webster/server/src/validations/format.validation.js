import { body } from 'express-validator';

export const checkFormatValidateChainMethod = [
    body("title")
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Title should be a string")
        .isLength({ min: 2, max: 32 })
        .withMessage("Length 2-32"),
    body('title_short')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Title short should be a string")
        .isLength({ min: 2, max: 10 })
        .withMessage("Length 2-10"),
    body('width')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('width must be a number'),
    body('height')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('height must be a number'),
    body('category_id')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('category_id must be a number')
        
]