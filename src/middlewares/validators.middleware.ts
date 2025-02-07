import { body } from "express-validator"

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isStrongPassword().withMessage('Password too weak'),
    body('userName').notEmpty().withMessage('User Name required'),

]

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isStrongPassword().withMessage('Password too weak')
    
]