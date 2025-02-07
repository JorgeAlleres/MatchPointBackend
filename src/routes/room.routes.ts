import { Router } from "express";
import {RoomController} from '../controllers/room.controller'
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

router.post('/',isAuthenticate, RoomController.create)
router.get('/:id',isAuthenticate, RoomController.getById)
router.get('/',isAuthenticate, RoomController.getAll)
router.put('/:id',isAuthenticate, RoomController.update) //TODO No funciona
router.delete('/:id',isAuthenticate, RoomController.delete) //TODO No funciona

export default router