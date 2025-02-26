import { Router } from "express";
import {GameController} from '../controllers/game.controller'
import { isAdmin } from "../middlewares/user.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { RoomController } from "../controllers/room.controller";

const router = Router()

router.get('/', GameController.getAll)
router.get('/:id', GameController.getById)
router.post('/',isAuthenticate,isAdmin, GameController.create)
router.put('/:id',isAuthenticate, isAdmin, GameController.update)
router.delete('/:id',isAuthenticate, isAdmin, GameController.delete)

router.get('/room', RoomController.getAll)

export default router