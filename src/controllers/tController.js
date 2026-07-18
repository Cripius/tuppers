// tController.js
// Controladores para las rutas de /Tuppers
// src/controllers/tController.js
const conectarDB = require("../config/db.js");

const tController = {
    muestraNuevoT: (req, res) => {
        res.render('pages/t/nuevoT');
    },
    
    guardaNuevoT: async (req, res) => {
        try {
            const db = await conectarDB();
            // Recibimos los nuevos campos desde el formulario (req.body)
            const nombre = req.body.nombre;
            const fecha_cocinado = req.body.fecha_cocinado;
            const tipo_comida = req.body.tipo_comida;
            const congelado = req.body.congelado;
            const notas = req.body.notas;

            // Si viene del checkbox, mapeamos 'on' a 1, de lo contrario 0
            const esCongelado = congelado === 'on' ? 1 : 0;

            /* 🔴 CAMBIO AQUÍ: db.query y sustitutos $1, $2... en vez de ? */
            await db.query(
                `INSERT INTO tuppers (nombre, fecha_cocinado, tipo_comida, congelado, notas) VALUES ($1, $2, $3, $4, $5)`,
                [nombre, fecha_cocinado, tipo_comida, esCongelado, notas]
            );
            console.log('TUPPER PUTO AÑADIDO');

            res.redirect('/tuppers/ver-tupper');
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al guardar el tupper");
        }
    },

    muestraVerT: async (req, res) => {
        try {
            const db = await conectarDB();
            
            /* 🔴 CAMBIO AQUÍ: db.query y extraemos los datos de .rows */
            const resultado = await db.query(`SELECT * FROM tuppers ORDER BY fecha_cocinado DESC`);
            const listaTuppers = resultado.rows;

            res.render('pages/t/verT', { tuppers: listaTuppers });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al leer los tuppers");
        }
    },

    eliminaT: async (req, res) => {
        try {
            const db = await conectarDB();
            const idTupper = req.params.id; // Capturamos el :id de la URL

            /* 🔴 CAMBIO AQUÍ: db.query y el marcador $1 */
            await db.query(`DELETE FROM tuppers WHERE id = $1`, [idTupper]);

            console.log(`\n Tupper [${idTupper}] se ha puto eliminado`);

            res.redirect('/tuppers/ver-tupper');
        } catch (error) {
            console.error("Error al eliminar el tupper:", error);
            res.status(500).send("Error al eliminar el tupper de la base de datos");
        }
    },
    muestraSugerencias: (req, res) => {
        res.render('pages/t/sugerencias');
    }
}   
module.exports = tController;