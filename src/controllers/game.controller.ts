import { HttpException } from "../exceptions/httpException"
import { GameService } from "../services/game.service"
import { NextFunction, Request, Response } from "express"

export class GameController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const games = await GameService.getAll();
            res.status(200).json(games)
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new HttpException(400, "Invalid game ID");

            const game = await GameService.getById(id);
            res.status(200).json(game)            
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const game = req.body;

            if (!game) throw new HttpException(400, "Category is required");

            const newGame = await GameService.create(game);
            res.status(201).json(newGame);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new HttpException(400, "Invalid game ID");

            const game = req.body;
            if (!game) throw new HttpException(400, "Game is required");

            const updatedGame = await GameService.update(id, game);
            res.status(200).json(updatedGame)
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new HttpException(400, "Invalid game ID");

            const deleted = await GameService.delete(id);
            res.status(200).json(deleted)
        } catch (error) {
            next(error);
        }
    }
}
