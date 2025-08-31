import db from "../database/db.js";
import { Product } from "../models/product.models.js";

//Create one product (name, price, image, description, amount) -> amount is required for stock table with its product
export const createProduct = async  (req,res)=>{
    const product = req.body;
    try {
        const result = await Product.create(product);
        console.log(result)
        if(result.success === true){
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json(result)
        }
    } catch (error) {
        console.log(error)
    }
}

//Get all products for see in Cards
export const getAllProducts = (_,res)=>{
    const query = `CALL getAllProducts()`
    db.query(query,(error, result)=>{
        if(error){
            console.log('Error al ejecutar el procedimiento ', error)
            return res.status(500).json({ message: error.message || 'Error al obtener los productos'})
        }
        else{
            return res.status(200).json({success:true, data: result[0] })
        }
    })
}

//Update one product (name, price, image, description, amount) -> amount is required for stock table with its product
export const updateProduct = (req,res)=>{
    const { id_product }  = req.params;
    const { name, price, image, description, amount } = req.body;
    const query = `CALL updateProduct(?,?,?,?,?,?)`;
    db.query(query, [id_product, name, price, image, description, amount], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al actualizar el producto'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}

//Delete one product
export const deleteProduct = (req,res)=>{
    const { id_product } = req.params;
    const query = `CALL deleteProduct(?)`
    db.query(query, [id_product], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento almacenado', err)
            return res.status(500).json({message: err.message || 'Error al eliminar el producto'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}