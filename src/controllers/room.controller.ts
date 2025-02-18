import { HttpException } from "../exceptions/httpException"
import { RoomService } from "../services/room.service"
import { NextFunction, Request, Response } from "express"

export class RoomController {
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid room ID");

            // pasar a entero
            const room = await RoomService.getById(id)
            res.status(200).json(room)
        } catch (error) {
            next(error)
        }
    }
    /* Función para obtener las salas filtradas por 'gameId'
    static async getRoomsByGameId(req: Request, res: Response): Promise<void> {
        const { gameId } = req.params; // Extraemos 'gameId' de los parámetros de la URL

        try {
            // Llamamos al servicio para obtener las salas relacionadas con el 'gameId'
            const rooms = await RoomService.getRoomsByGameId(Number(gameId));
            res.json(rooms);  // Enviamos la respuesta con las salas encontradas
        } catch (error) {
            // Si ocurre un error, respondemos con un mensaje de error
            res.status(500).json({ message: 'Error al obtener las salas', error: error instanceof Error ? error.message : 'Desconocido' });
        }
    }*/

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { roomName } = req.query;
            const rooms = await RoomService.getAll(roomName as string)
            res.status(200).json(rooms)
        } catch (error) {
            next(error)
        }
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const roomData = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");
            const newRoom = await RoomService.create(roomData, userId)
            res.status(201).json({ message: 'Room register successfully', newRoom })
        } catch (error) {
            next(error)
        }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid room ID");

            const roomDeleted = await RoomService.delete(id)
            res.status(201).json({ message: 'Room deleted successfully', roomDeleted })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const roomData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid room ID");

            const updateRoom = await RoomService.update(id, roomData)
            res.status(201).json({ message: 'Room updated successfully', updateRoom })
        } catch (error) {
            next(error)
        }
    }
}
