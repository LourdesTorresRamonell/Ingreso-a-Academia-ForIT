const express=require(`express`);
const { listarTareas, crearTares, actualizarTareas, borrarTareas }=require(`./controllers/tareasController.js`);
const router=express.Router()

router.get(`/`, listarTareas);
router.post(`/`, crearTares);
router.put(`/:id`, actualizarTareas);
router.delete(`/:id`, borrarTareas);

export default router;