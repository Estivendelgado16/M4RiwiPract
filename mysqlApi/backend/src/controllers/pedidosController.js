const pool = require('../config/db');

exports.crearPedido = async (req, res) => {
    const { id_cliente, id_vendedor, productos} = req.body;

    const connection = await pool.getConnection();

    try {

    // 🔥 iniciar transacción
    await connection.beginTransaction();

    // 1️⃣ crear pedido
    const [pedidoResult] = await connection.execute(
      `INSERT INTO pedido (id_cliente, id_vendedor)
       VALUES (?, ?)`,
      [id_cliente, id_vendedor]
    );

    const id_pedido = pedidoResult.insertId;

    // 2️⃣ insertar detalles
    for (const producto of productos) {

      await connection.execute(
        `INSERT INTO detalle_pedido
        (id_pedido, id_producto, cantidad)
        VALUES (?, ?, ?)`,
        [
          id_pedido,
          producto.id_producto,
          producto.cantidad
        ]
      );
    }

    // ✅ guardar todo
    await connection.commit();

    res.status(201).json({
      mensaje: "Pedido creado correctamente",
      id_pedido
    });

  } catch (error) {

    // ❌ si algo falla
    await connection.rollback();

    console.error(error);

    res.status(500).json({
      error: "Error creando pedido"
    });

  } finally {
    connection.release();
  }
}