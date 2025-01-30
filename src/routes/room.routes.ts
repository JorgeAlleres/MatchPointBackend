import { Router } from "express";
import {PlanController} from '../controllers/room.controller'

const router = Router()

//Listar todos las salas localhost:3000/api/room/?title=react&category=DAM
//router.get('/', RoomController.getAll)
//Añadir una sala nueva POST localhost:3000/api/room/{body}
//router.post('/', RoomController.save)
// DELETE Borrar una sala localhost:3000/api/room/XXXX
//router.delete('/:id', RoomController.delete)
// MODIFICAR Actualizar una sala localhost:3000/api/room/XXXX  {body}
//router.put('/id', RoomController.update)

export default router