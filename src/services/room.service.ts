import { NextFunction } from "express";
import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Room } from "prisma/prisma-client";

export class RoomService {
    static async getById(id: number) {
        const findRoom = await prisma.room.findUnique({ where: { id } })
        if (!findRoom) throw new HttpException(404, 'Room not found')
        return findRoom
    }
    static async getAll(roomName: string = '') {

        return await prisma.room.findMany({
            where: {
                ...(roomName && {
                    roomName: {
                        contains: roomName,
                        //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
                    }
                })
            },
            orderBy: {
                createdAt: 'desc'
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
    /* Método para obtener las salas filtradas por gameId
    static async getRoomsByGameId(gameId: number) {
        try {
            // Obtenemos las salas filtradas por 'gameId'
            const rooms = await prisma.room.findMany({
                where: {
                    idRoomGame: gameId, // Filtramos por 'gameId'
                },
            });
            return rooms;
        } catch (error) {
            throw new Error('Error al obtener las salas: ' + error.message);
        }
    }*/
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