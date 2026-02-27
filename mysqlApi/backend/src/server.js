const express = require("express");
const cors = require("cors");
require("dotenv").config();

const clienteRoutes = require("./routes/clientesRoute");
const pedidosRoute = require('./routes/pedidosRoute');
const productosRoute = require('./routes/productosRoute')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", clienteRoutes);
app.use('/api', pedidosRoute)
app.use('/api', productosRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});