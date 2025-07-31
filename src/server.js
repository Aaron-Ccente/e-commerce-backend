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

app.get("/productos", (_,res)=>{
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

//Crear usuarios
app.post("/users", (req,res)=>{
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

//-----------------------------------------------------------------------------------------------


app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})