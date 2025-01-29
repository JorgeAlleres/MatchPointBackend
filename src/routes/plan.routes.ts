import { Router } from "express";
import {PlanController} from '../controllers/plan.controller'

const router = Router()

//Listar todos los planes localhost:3000/api/plan/?title=react&category=DAM
router.get('/', PlanController.getAll)
//Añadir un plan nueva POST localhost:3000/api/plan/{body}
router.post('/', PlanController.save)
// DELETE Borrar un plan localhost:3000/api/plan/XXXX
router.delete('/:id', PlanController.delete)
// MODIFICAR Actualizar un plan localhost:3000/api/plan/XXXX  {body}
router.put('/id', PlanController.update)

//Calificar un plan    {body}
router.post('/:id/rate', PlanController.rate)
// Vemos que calificaion total se le ha dado a un plan
router.get('/:id/rate/', PlanController.getRate)

export default router