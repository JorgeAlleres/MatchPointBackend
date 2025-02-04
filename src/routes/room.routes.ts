import { Router } from "express";
import {RoomController} from '../controllers/room.controller'
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

router.post('/',isAuthenticate, RoomController.create)
router.get('/',isAuthenticate, RoomController.list)
router.put('/:id',isAuthenticate, RoomController.update)
router.delete('/:id',isAuthenticate, RoomController.delete)

export default router