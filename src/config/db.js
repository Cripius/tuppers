// src/config/db.js
const { Client } = require('pg');

let db;

async function conectarDB() {
    if (!db) {
        // 1. Conectamos usando la URL de internet (o una local de pruebas)
        // Usamos { rejectUnauthorized: false } porque Neon requiere conexión segura SSL
        const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_8omHMDQeLc3X@ep-morning-pine-avaoe756.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require";

        db = new Client({
            connectionString: connectionString,
            ssl: { rejectUnauthorized: false } 
        });

        await db.connect();

        // 2. ESCRIBIR AQUÍ EN SQL LA TABLA (Adaptada a Postgres)
        // En Postgres, SERIAL funciona igual que AUTOINCREMENT en SQLite
        await db.query(`
            CREATE TABLE IF NOT EXISTS tuppers (
                id SERIAL PRIMARY KEY,
                nombre TEXT NOT NULL,
                fecha_cocinado TEXT NOT NULL,
                tipo_comida TEXT NOT NULL,
                congelado INTEGER DEFAULT 1,
                notas TEXT
            )
        `);
        
        console.log("La base de datos PostgreSQL está puto actualizada y lista");
    }
    return db;
}

module.exports = conectarDB;