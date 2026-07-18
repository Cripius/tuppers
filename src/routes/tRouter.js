// tRouter.js
// Gestor para rutas relacionadas con Tuppers
const express = require("express");
const router = express.Router();
const controller = require("../controllers/tController.js");

// Rutas

// Dentro de tu tRouter.js
router.get("/nuevo-tupper", controller.muestraNuevoT); 
router.post("/nuevo-tupper", controller.guardaNuevoT); // formulario

router.get("/ver-tupper", controller.muestraVerT);

router.post("/eliminar/:id", controller.eliminaT);

router.get("/sugerencias", controller.muestraSugerencias); 

module.exports = router;
