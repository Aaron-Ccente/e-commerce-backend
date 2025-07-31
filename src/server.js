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

//-----------------------------------------------------------------------------------------------

app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})