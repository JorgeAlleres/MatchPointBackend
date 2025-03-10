import { UserRoomService } from '../services/user_room.service';
import { Response, Request, NextFunction } from 'express'

export class User_roomController {
    static async joinRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const { idUser, idRoom, roleInRoom } = req.body;
            const userRoom = await UserRoomService.joinRoom(idUser, idRoom, roleInRoom);
            res.status(201).json(userRoom);
        } catch (error) {
            next(error)
        }
    };
    
    static async leaveRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const { idUser, idRoom } = req.body;
            await UserRoomService.leaveRoom(idUser, idRoom);
            res.status(200).json({ message: 'User removed from room' });
        } catch (error) {
            next(error)
        }
    };
    
    static async getRoomUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { idRoom } = req.params;
            const users = await UserRoomService.getRoomUsers(Number(idRoom));
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    };
    
    static async getRoomUserCount(req: Request, res: Response, next: NextFunction) {
    try {
        const { idRoom } = req.params;
        const countData = await UserRoomService.getRoomUserCount(Number(idRoom));
        res.status(200).json(countData); 
    } catch (error) {
        next(error);
    }
}
}