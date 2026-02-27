backend-db-exam/
│
├── README.md
├── package.json
├── server.js
│
├── config/
│   ├── mysql.js
│   └── mongo.js
│
├── models/
│   ├── mysql/
│   └── mongo/
│
├── routes/
│
├── controllers/
│
├── sql/
│   └── schema.sql
│
└── examples/
    └── requests.json

Ahora te explico qué subir y por qué.

✅ 1. README.md (LO MÁS IMPORTANTE)

Muchos estudiantes fallan aquí.

Debe explicar:

qué hace el proyecto

cómo instalarlo

cómo correrlo

qué tecnologías usa

ejemplos de endpoints

Ejemplo mínimo:

# API Base de Datos - MySQL y MongoDB

Proyecto Express que conecta:
- MySQL (relacional)
- MongoDB (NoSQL)

## Instalación

npm install

## Ejecutar

node server.js

## Endpoints

GET /clientes
POST /clientes
GET /productos

👉 El README demuestra que entiendes el sistema completo.

✅ 2. Conexión a MySQL

Archivo:

config/mysql.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'examen_db'
});

connection.connect();

module.exports = connection;
Qué demuestra

✔ sabes conectar backend ↔ base relacional.

✅ 3. Conexión a MongoDB

Archivo:

config/mongo.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/examen');

module.exports = mongoose;
Qué demuestra

✔ sabes usar ODM (mongoose).

✅ 4. MODELO MySQL (consultas reales)

Ejemplo:

models/mysql/clienteModel.js
const db = require('../../config/mysql');

exports.getClientes = (callback) => {
  db.query('SELECT * FROM cliente', callback);
};
✅ 5. MODELO MongoDB
models/mongo/producto.js
const mongoose = require('../../config/mongo');

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number
});

module.exports = mongoose.model('Producto', ProductoSchema);
✅ 6. Controladores (MUY IMPORTANTE)

Aquí demuestras lógica backend.

controllers/clienteController.js
const clienteModel = require('../models/mysql/clienteModel');

exports.obtenerClientes = (req, res) => {
  clienteModel.getClientes((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
✅ 7. Rutas Express
routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/', controller.obtenerClientes);

module.exports = router;
✅ 8. server.js (el cerebro)
const express = require('express');
const app = express();

app.use(express.json());

app.use('/clientes', require('./routes/clienteRoutes'));

app.listen(3000, () => {
  console.log('Servidor corriendo');
});
✅ 9. Archivo SQL (PROFESOR AMA ESTO)

Carpeta:

sql/schema.sql

Incluye:

CREATE TABLE cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pedido (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT,
  FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
);
Esto demuestra:

✅ sabes PK
✅ FK
✅ relaciones
✅ diseño relacional

✅ 10. Ejemplos de pruebas (nivel PRO)
examples/requests.json
{
  "GET_clientes": "http://localhost:3000/clientes"
}

O exporta Postman.

Profesor ve → entiende rápido.