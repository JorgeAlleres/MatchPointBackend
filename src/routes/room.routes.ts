import { Router } from "express";
import {RoomController} from '../controllers/room.controller'
import { isAuthenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/user.middleware";

const router = Router()

router.get('/',isAuthenticate, RoomController.getAll)
router.get('/:id',isAuthenticate, RoomController.getById)
router.post('/',isAuthenticate, RoomController.create)
router.put('/:id',isAuthenticate, RoomController.update)
router.delete('/:id',isAuthenticate, RoomController.delete)

export default router