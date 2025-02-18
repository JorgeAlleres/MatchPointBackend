import { HttpException } from "@/exceptions/httpException";
import { UserService } from "../services/user.service";
import { Response, Request, NextFunction } from 'express'

export class UserController {
    static async profile(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.user.email
            const user = await UserService.getByEmail(email)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) throw new HttpException(400, "Invalid user ID");
                const user = await UserService.getById(id);
                res.status(200).json(user)            
            } catch (error) {
                next(error);
            }
        }
    static async usersList(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAll()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userUpdate = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid user ID");

            const updatedUser = await UserService.update(id, userUpdate)

            res.status(201).json({ message: 'user updated successfully', updatedUser })
        } catch (error) {
            next(error)
        }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
            try {
                const id = Number.parseInt(req.params.id)
                if (isNaN(id)) throw new HttpException(400, "Invalid user ID");
    
                const userDeleted = await UserService.delete(id)
                res.status(201).json({ message: 'User deleted successfully', userDeleted })
            } catch (error) {
                next(error)
            }
        }
}
