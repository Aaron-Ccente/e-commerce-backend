import express from 'express'
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


app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})