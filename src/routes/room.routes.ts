import { Router } from "express";
import {RoomController} from '../controllers/room.controller'
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

router.post('/',isAuthenticate, RoomController.create)
router.get('/:id',isAuthenticate, RoomController.getById)
router.get('/',isAuthenticate, RoomController.getAll)
router.put('/:id',isAuthenticate, RoomController.update)
router.delete('/:id',isAuthenticate, RoomController.delete)

export default router