import express from "express"
import {listarTereas, crearTarea, actualizarTarea, borrarTarea } from "../controllers/tareasController.js"

const router=express.Router()

router.get(`/`, listarTereas);
router.post(`/`, crearTarea);
router.put(`/:id`, actualizarTarea);
router.delete(`/:id`, borrarTarea);

export default router