import { customJwtPayload } from '../types/express'
import {Response, Request, NextFunction} from 'express'
import jwt from "jsonwebtoken"

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

//TODO Quita el any
export const isAuthenticate = (req:Request, res:Response, next:NextFunction):any => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message: 'Access denied'})
    try {
        const tokenDecodificado = jwt.verify(token, TOKEN_PASSWORD)
        req.user = tokenDecodificado as customJwtPayload
        next()
    } catch(error) {
        res.status(401).json({error:'Invalid token'})
    }
}