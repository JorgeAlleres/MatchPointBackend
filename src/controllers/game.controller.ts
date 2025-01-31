import { GameService } from "../services/game.service"
import { NextFunction, Request, Response } from "express"

export class GameController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const games = await GameService.getAll()
            res.status(200).json(games)
        } catch (error) {
            next(error)
        }
    }
    static async create(req: Request, res: Response, next:NextFunction) {
        try {
            const gameData = req.body
            const newGame = await GameService.create(gameData)
            res.status(201).json({ message: 'Game register successfully', newGame })
        } catch (error) {
            next(error)
        }
    }
    static async delete(idGame:number, req:Request, res:Response, next:NextFunction) {
        try {
            const gameDeleted = await GameService.delete(idGame)
            res.status(201).json({ message: 'Game deleted successfully', gameDeleted })
        } catch (error) {
            next(error)
        }
    }
    static async update(id:number, req: Request, res: Response, next:NextFunction) {
        try {
            const gameData = req.body
            const updatedData = await GameService.update(id, gameData)
            res.status(201).json({ message: 'Game updated successfully', updatedData })
        } catch (error) {
            next(error)
        }
    }
}
