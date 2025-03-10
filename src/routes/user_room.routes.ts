import { User_roomController } from "../controllers/user_room.controller";
import { Router } from "express";

const router = Router()

router.post('/join', User_roomController.joinRoom);
router.post('/leave', User_roomController.leaveRoom);
router.get('/room/:idRoom/users', User_roomController.getRoomUsers);
router.get('/room/:idRoom/count', User_roomController.getRoomUserCount);

export default router;