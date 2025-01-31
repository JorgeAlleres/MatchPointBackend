import { Router } from "express";
import {GameController} from '../controllers/game.controller'
import { isAdmin } from "../middlewares/user.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

router.post('/',isAuthenticate, isAdmin, GameController.create)
router.get('/',isAuthenticate, isAdmin, GameController.list)
router.put('/:id',isAuthenticate, isAdmin, GameController.update)
router.delete('/:id',isAuthenticate, isAdmin, GameController.delete)

export default router