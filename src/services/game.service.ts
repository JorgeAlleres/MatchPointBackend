import { HttpException } from "../exceptions/httpException";
import { Game, PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()
export class GameService {
    static async getAll() {
        const findGames = await prisma.game.findMany()
        return findGames
    }
    static async create(game: Game) {
        const findGame = await prisma.game.findFirst({ where: { gameName: game.gameName } })
        if (findGame) throw new HttpException(409, `Game ${game.gameName} already exists`)
        return await prisma.game.create({data: {...game}})
    }
    static async delete(idGame: number) {
        const gameDeleted = await prisma.game.delete({ where: { id: idGame } })
        if (!gameDeleted) throw new HttpException(404, `GameID ${idGame} doesnt exists`)
        return gameDeleted
    }
    static async update(idGame: number, game: Game) {
        const gameUpdate = await prisma.game.update({ 
            where: { id: idGame },
            data: {...game}
        })
        if (!gameUpdate) throw new HttpException(409, `GameID ${idGame} doesnt exists`)
        return gameUpdate
    }
}