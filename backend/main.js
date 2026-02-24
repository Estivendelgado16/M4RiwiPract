import express from 'express';
import mysql from 'mysql2/promise';
import { config } from "dotenv";
import cors from 'cors';

config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5174'
}));

app.use(express.json());


const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.BD_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL conectado correctamente");
    connection.release();
  } catch (err) {
    console.error("❌ ERROR CONECTANDO MYSQL:", err.message);
  }
})();


app.get('/', (req, res) => {
  res.send('Servidor corriendo 🚀');
});


app.post('/api/query-table', async (req, res) => {
  const { sql } = req.body;

  if (!sql || !sql.trim().toLowerCase().startsWith('select')) {
    return res.status(400).json({ error: 'Solo se permiten consultas SELECT' });
  }

  try {
    const [rows] = await pool.query(sql);
    res.json({ results: rows });
  } catch (err) {
    console.error('SQL:', sql); 
    console.error('Error completo:', err); 
    res.status(500).json({ error: err.message }); 
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});