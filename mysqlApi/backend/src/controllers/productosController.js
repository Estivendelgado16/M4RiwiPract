const pool = require("../config/db");

// ✅ GET
exports.obtenerProductos = async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM producto");
  res.json(rows);
};

// ✅ POST
exports.crearProducto = async (req, res) => {
  try {
    const { producto_nombre, producto_precio } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO producto (producto_nombre, producto_precio)
       VALUES (?, ?)`,
      [producto_nombre, producto_precio]
    );

    res.status(201).json({
      mensaje: "Producto creado",
      id_producto: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando producto" });
  }
};

// ✅ PUT
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { producto_nombre, producto_precio } = req.body;

  try {
    await pool.execute(
      `UPDATE producto
       SET producto_nombre=?, producto_precio=?
       WHERE id_producto=?`,
      [producto_nombre, producto_precio, id]
    );

    res.json({ mensaje: "Producto actualizado" });

  } catch (error) {
    res.status(500).json({ error: "Error actualizando producto" });
  }
};

// ✅ DELETE
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.execute(
      "DELETE FROM producto WHERE id_producto=?",
      [id]
    );

    res.json({ mensaje: "Producto eliminado" });

  } catch (error) {
    res.status(500).json({ error: "Error eliminando producto" });
  }
};