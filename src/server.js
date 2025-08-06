import express, { json } from 'express'
import cors from 'cors'
import db from './database/db.js'

import { PORT } from './config/config.js';
const app = express();
app.use(cors())
app.use(express.json())


app.get("/",(_,res)=>{
    res.send("Hello")
})

//-----------------------------------------------------------------------------------------------

//Endpoint para crear categorias
app.post("/category",(req,res)=>{
    const {name} = req.body;
    const query = `CALL createCategory(?)`
    db.query(query, [name], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento almacenado: ', err)
            return res.status(500)-json({message: err.message || 'Error al crear una categoria'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})

//Obtener las categorias
app.get("/category",(_, res)=>{
    const query = `CALL getAllCategories()`
    db.query(query, (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento' || err)
            return res.status(500).json({ message: err.message || 'Error al obtener las categorias' })
        }
        else{
            return res.status(200).json(result[0])
        }
    })
})

//Actualizar una categoria
app.put("/category/:id", (req, res)=>{
    const { id } = req.params;
    const { name } = req.body;
    const query = `CALL updateCategory(?,?)`
    db.query(query, [id, name], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({ message: err.message || 'Error al actualizar la categoria'})
        }
        else{
            return res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})


//Eliminar una categoria
app.delete("/category/:id",(req, res)=>{
    const { id } = req.params;
    const query = `CALL deleteCategory(?)`;
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento almacenado', err)
            return res.status(500).json({ message: err.message})
        }
        else{
            return res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje})
        }
    })

})

//-----------------------------------------------------------------------------------------------

//Crear un usuario
app.post("/user", (req,res)=>{
    const { email, password, name, lastname, phone, role } = req.body
    const query = `CALL createUser(?,?,?,?,?,?)`
    db.query(query, [email, password, name, lastname, phone, role], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({ message: err.message || 'Error al crear usuario'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})


//Para el login de los usuarios
app.post("/login",(req,res)=>{
    const {email, password} = req.body;
    const query = `CALL loginUserOrAdmin(?,?)`
    db.query(query, [email, password], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al iniciar sesión'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})

//Para editar el perfil de un usuario
app.put("/user/:id", (req, res)=>{
    const { id } = req.params;
    const { name, lastname, phone } = req.body;
    const query = `CALL updateUser(?,?,?,?)`;
    db.query(query, [id, name, lastname, phone], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al editar en usuario'})
        }
        else{
            return res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje })
        }
    })
})

//Para eliminar la cuenta de usuario
app.delete("/user/:id", (req, res)=>{
    const {id} = req.params;
    const query = `CALL deleteUser(?)`
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al eliminar la cuenta de usuario'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})

//-----------------------------------------------------------------------------------------------

//Create one product (name, price, image, description, amount) -> amount is required for stock table with its product
app.post("/product", (req,res)=>{
    const { name, price, image, description, amount } = req.body;
    const query = `CALL createProduct(?,?,?,?,?)`;
    db.query(query, [name, price, image, description, amount], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al crear el producto'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})

//Get all products for see in Cards
app.get("/products", (_,res)=>{
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
})

//Update one product (name, price, image, description, amount) -> amount is required for stock table with its product
app.put("/product/:id_product", (req,res)=>{
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
})

//Delete one product
app.delete("/product/:id_product", (req,res)=>{
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
})

//-----------------------------------------------------------------------------------------------

// Get all the user's favorite furniture
app.get("/favorite", (req, res)=>{
    const {id} = req.body;
    const query = `CALL getAllFavorites(?)`
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log("Error al ejecutar el procedimiento", err)
            return res.status(500).json({message: err.message || "Error al obtener los muebles favoritos"})
        }
        else{
            return res.status(200).json({success: true, data: result[0]?.[0]})
        }
    })
})

// Delete user's favorite furniture
app.delete("/favorite/:id", (req, res)=>{
    const {id_product} = req.params;
    const query = `CALL deleteFavorite(?)`
    db.query(query, [id_product], (err, result)=>{
        if(err){
            console.log("Error al ejecutar el procedimiento almacenado", err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})

//-----------------------------------------------------------------------------------------------

// Filter furniture
app.get("/furniture", (req,res)=>{
    const {name, price, category} = req.query;
    const query = `CALL getFilteredFurniture(?,?,?)`
    db.query(query, [name,price,category], (err, result)=>{
        if(err){
            console.log("Error al ejecutar el procedimiento almacenado", err)
            return res.status(500).json({message: err.message || "Error al filtrar muebles"})
        }
        else{
            return res.status(200).json({success: true, data: result[0]?.[0]})
        }
    })
})


//-----------------------------------------------------------------------------------------------

// User buys a piece of furniture
app.post("/sale", (req, res)=>{
    const { id_user, id_product, amount, total_price } = req.body;
    const query = `CALL userBuysFurniture(?,?,?,?)`
    db.query(query, [id_user, id_product, amount, total_price], (err, result)=>{
        if(err){
            console.log("Error al ejecutar el procedimiento almacenado", err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, data: result[0]?.[0]?.mensaje})
        }
    })
})


//-----------------------------------------------------------------------------------------------


app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})