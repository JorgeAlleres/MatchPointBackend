import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Room } from "prisma/prisma-client";

export class RoomService {
    static async getById(id: number) {
        const findRoom = await prisma.room.findUnique({ where: { id } })
        if (!findRoom) throw new HttpException(404, 'Room not found')
        return findRoom
    }

    static async getAll(idRoomGame: number, roomName?: string, capacity?: number, privateQuery?: boolean) {
        return await prisma.room.findMany({
            where: {
                idRoomGame, // Filtramos por id del juego
                ...(roomName ? { roomName: { contains: roomName } } : {}), // Filtrar solo si roomName está presente
                ...(capacity !== undefined ? { capacity: { gte: capacity } } : {}), // Filtrar solo si capacity está presente
                ...(privateQuery === false ? { private: false } : {}), // Filtrar solo si privateQuery está presente
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 100,
            include: {
                game: {
                    select: {
                        gameName: true
                    }
                }
            }
        });
    }
    static async create(room: Room, idUser: number) {
        return await prisma.room.create({
            data: {
                ...room,
                idUserCreator: idUser
            }
        })
    }
    static async delete(id: number) {
        try {
            return await prisma.room.delete({ where: { id } });
        } catch (error) {
            throw new HttpException(404, "Room not found");
        }
    }
    static async update(id: number, room: Room) {
        const findRoom = await prisma.room.findUnique({ where: { id } })
        if (!findRoom) throw new HttpException(404, 'Room doesnt exists')
        return await prisma.room.update({
            where: { id },
            data: {
                ...room,
            }
        })
    }
}