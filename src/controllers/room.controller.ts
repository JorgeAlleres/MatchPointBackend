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

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { idRoomGame, roomName, capacity, privacity } = req.query;

            // Validación y conversión de parámetros
            const idGame = Number(idRoomGame)
            const roomNameString = roomName ? String(roomName) : undefined;
            const capacityNumber = capacity ? Number(capacity) : undefined;
            const privacityBoolean = privacity === "false" ? false : undefined; // Filtrar por salas públicas

            // Llamar al servicio con los parámetros validados
            const rooms = await RoomService.getAll(idGame, roomNameString, capacityNumber, privacityBoolean);

            // Enviar respuesta
            res.status(200).json(rooms);
        } catch (error) {
            next(error);
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
