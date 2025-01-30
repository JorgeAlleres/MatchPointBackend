import { body } from "express-validator"

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('Password too short'),
    body('userName').notEmpty().withMessage('user Name required'),

]

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('Password too short')
    
]