import { User } from "prisma/prisma-client"
import { prisma } from "../database/database"
import { HttpException } from "../exceptions/httpException"

export class UserService {

    static async getById(id: number) {
        const findUser = await prisma.user.findUnique({ where: {id}})
        if (!findUser) throw new HttpException(404, 'User not found')
        return findUser
    }

    static async getByEmail(email: string) {
        const findUser = await prisma.user.findUnique({ where: { email }, omit: { password: true } })
        if (!findUser) throw new HttpException(404, 'User not found')
        return findUser
    }

    static async getAll() {
        const findUsers = await prisma.user.findMany({ omit: { password: true } })
        return findUsers
    }
    static async update(idUser: number, user: User) {
        const userUpdate = await prisma.user.update({
            where: { id: idUser },
            data: { ...user }
        })
        if (!userUpdate) throw new HttpException(409, `UserID ${idUser} doesnt exists`)
        return userUpdate
    }
    static async delete(id: number) {
        try {
            return await prisma.user.delete({ where: { id } });
        } catch (error) {
            throw new HttpException(404, "User not found");
        }
    }
}