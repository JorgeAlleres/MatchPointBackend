import { Router } from "express";
import {UserController} from '../controllers/user.controller'
import { isAuthenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/user.middleware";

const router = Router()

router.get('/', isAuthenticate, isAdmin, UserController.usersList)
router.get('/:id', UserController.getById)
router.put('/:id'/*, isAuthenticate, isAdmin*/, UserController.update)
router.delete('/:id'/*, isAuthenticate, isAdmin*/, UserController.delete)
router.get('/profile', isAuthenticate, UserController.profile)

export default router