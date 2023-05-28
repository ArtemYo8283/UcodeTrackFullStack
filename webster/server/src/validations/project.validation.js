import { body } from 'express-validator';

export const projectValidationChainMethod = [
    body('title')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Title should be a string")
        .isLength({ min: 2, max: 100 })
        .withMessage("Length 2-100"),
    body('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("description should be a string")
        .isLength({ min: 2, max: 10000 })
        .withMessage("Length 2-10000"),
    body('json_file')
        .exists({ checkFalsy: true })
        .isString()
        .custom((value) => /\.(json)$/.test(value)).withMessage("Invalid format"),
    body('date_upd').isISO8601()
]