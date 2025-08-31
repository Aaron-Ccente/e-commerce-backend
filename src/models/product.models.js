import db from "../database/db.js";

export class Product {
  // Crear un nuevo administrador
  static async create(product) {
    try {
        const { name, price, image, description, amount } = product;
        const query = `INSERT INTO product (name, price, image, description, amount) VALUES (?,?,?,?,?)`;
        const [result] = await db.promise().query(query, [name, price, image, description, amount]);

        return {
            success: true,
            message: 'Producto creado correctamente',
            insertId: result.insertId
        };
    } catch (error) {
        console.error('Error al crear producto:', error);
        return { success: false, message: err.message || 'Error al crear el producto' };
    }
    }
  }