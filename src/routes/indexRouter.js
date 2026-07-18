// indexRouter.js
// Gestor de rutas principal
const express = require("express");
const router = express.Router();
const tRouter = require('./tRouter');

//Intermediario para usar 
router.use("/tuppers", tRouter);

// Ruta raíz 
router.get("/", (req, res) => {
    res.render('pages/inicio.ejs');
});

// El patrón /*splat representa cualquier ruta 
router.use((req, res) => {
    res.status(404).render('pages/404.ejs');
});

module.exports = router;
