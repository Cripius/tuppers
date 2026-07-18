// index.js

// Para actualizar gitHub, copiar y pegar:
/*
git add .
git commit -m "última subida base"
git push origin main
*/

const express = require("express");
const conectarDB = require('./config/db.js');

/* Esto es lo que hay que cambiar para subirlo a Render*/
const PORT = process.env.PORT || 3000;

const path = require("path");
const PUBLIC_PATH = path.join(__dirname, "public");
const VIEWS_PATH = path.join(__dirname, "views");
const ROUTES_PATH = path.join(__dirname, "routes");

const indexRouter = require(ROUTES_PATH + "/indexRouter.js");
const tRouter = require(ROUTES_PATH + "/tRouter.js");

const app = express();

// Vistas
app.set("views", VIEWS_PATH);
app.set("view engine", "ejs");

// Intermediarios
app.use(express.static(PUBLIC_PATH));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/tuppers", tRouter);

conectarDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor atendiendo al puerto ${PORT}`);
    });
});

