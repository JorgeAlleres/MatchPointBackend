import { RoomService } from "../services/room.service"
import { NextFunction, Request, Response } from "express"

export class RoomController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const rooms = await RoomService.getAll()
            res.status(200).json(rooms)
        } catch (error) {
            next(error)
        }
    }
    static async create(req: Request, res: Response, next:NextFunction) {
        try {
            const roomData = req.body
            const newRoom = await RoomService.create(roomData)
            res.status(201).json({ message: 'Room register successfully', newRoom })
        } catch (error) {
            next(error)
        }
    }
    static async delete(idRoom:number, req:Request, res:Response, next:NextFunction) {
        try {
            const roomDeleted = await RoomService.delete(idRoom)
            res.status(201).json({ message: 'Room deleted successfully', roomDeleted })
        } catch (error) {
            next(error)
        }
    }
    static async update(id:number, req: Request, res: Response, next:NextFunction) {
        try {
            const roomData = req.body
            const updatedData = await RoomService.update(id, roomData)
            res.status(201).json({ message: 'Room updated successfully', updatedData })
        } catch (error) {
            next(error)
        }
    }
}
