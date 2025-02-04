import { HttpException } from "../exceptions/httpException";
import { Room, PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()
export class RoomService {
    static async getAll() {
        const findRooms = await prisma.room.findMany()
        return findRooms
    }
    static async create(room: Room) {
        const findRoom = await prisma.room.findFirst({ where: { roomName: room.roomName } })
        if (findRoom) throw new HttpException(409, `Room ${room.roomName} already exists`)
        return await prisma.room.create({data: {...room}})
    }
    static async delete(idRoom: number) {
        const roomDeleted = await prisma.room.delete({ where: { id: idRoom } })
        if (!roomDeleted) throw new HttpException(404, `RoomID ${idRoom} doesnt exists`)
        return roomDeleted
    }
    static async update(idRoom: number, room: Room) {
        const roomUpdate = await prisma.room.update({ 
            where: { id: idRoom },
            data: {...room}
        })
        if (!roomUpdate) throw new HttpException(409, `RoomID ${idRoom} doesnt exists`)
        return roomUpdate
    }
}