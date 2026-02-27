const db = require("../config/db");

exports.crearCliente = async (req, res) => {
  try {
    const {
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      cliente_ciudad
    } = req.body;

    const sql = `
        INSERT INTO cliente
        (cliente_nombre, cliente_email, cliente_telefono, cliente_ciudad)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      cliente_ciudad
    ]);

    res.status(201).json({
      mensaje: "Cliente creado",
      id_cliente: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
};