const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clientesControllers");


router.post("/clientes", clienteController.crearCliente);


module.exports = router;