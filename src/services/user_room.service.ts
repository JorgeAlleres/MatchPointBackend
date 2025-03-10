import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";

export class UserRoomService {

    // Unirse a una sala
    static async joinRoom(idUser: number, idRoom: number, roleInRoom: string) {
        try {
            // Verificar si el usuario ya está en la sala
            const existingEntry = await prisma.user_Room.findUnique({
                where: { idUser_idRoom: { idUser, idRoom } },
            });

            if (existingEntry) {
                throw new HttpException(409, "Ya estás en esta sala");
            }

            // Contar usuarios en la sala
            const userCount = await prisma.user_Room.count({ where: { idRoom } });

            // Obtener la capacidad máxima de la sala
            const room = await prisma.room.findUnique({ where: { id: idRoom } });

            if (!room) throw new HttpException(404, "La sala no existe");
            if (userCount >= room.capacity) {
                throw new HttpException(403, "La sala está llena");
            }

            // Insertar usuario en la sala
            return await prisma.user_Room.create({
                data: {
                    idUser,
                    idRoom,
                    roleInRoom,
                    dateUnion: new Date(),
                },
            });
        } catch (error) {
            throw new HttpException(500, "Error al unirse a la sala");
        }
    }

    // Salir de una sala
    static async leaveRoom(idUser: number, idRoom: number) {
        try {
            const deletedEntry = await prisma.user_Room.deleteMany({
                where: { idUser, idRoom },
            });

            if (deletedEntry.count === 0) {
                throw new HttpException(404, "No estás en esta sala");
            }

            return { message: "Has salido de la sala correctamente" };
        } catch (error) {
            throw new HttpException(500, "Error al salir de la sala");
        }
    }

    // Obtener todos los usuarios de una sala
    static async getRoomUsers(idRoom: number) {
        try {
            const users = await prisma.user_Room.findMany({
                where: { idRoom },
                include: {
                    user: { select: { id: true, userName: true, email: true } },
                },
            });

            if (!users.length) throw new HttpException(404, "No hay usuarios en esta sala");

            return users;
        } catch (error) {
            throw new HttpException(500, "Error al obtener los usuarios de la sala");
        }
    }

    // Contar usuarios en una sala
    static async getRoomUserCount(idRoom: number) {
        const count = await prisma.user_Room.count({
            where: { idRoom },
        });
        return { count };
    }
    
}
