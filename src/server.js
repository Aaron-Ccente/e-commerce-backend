import express, { json } from 'express'
import cors from 'cors'
import db from './database/db.js'
import categoryRouters from './routes/category.routes.js'
import userRouters from './routes/user.routes.js'
import categoryRoutes from './routes/product.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'
import filterRoutes from './routes/filter.routes.js'
import orderRoutes from './routes/order.routes.js'

import { PORT } from './config/config.js';
const app = express();
app.use(cors())
app.use(express.json())


app.get("/",(_,res)=>{
    res.send("Hello")
})

//-----------------------------------------------------------------------------------------------

// Rutas para las categorias
app.use("/category", categoryRouters)

//-----------------------------------------------------------------------------------------------

// Rutas para los usuarios
app.use("/user", userRouters)

//-----------------------------------------------------------------------------------------------

// Rutas para los productos
app.use("/product", categoryRoutes)

//-----------------------------------------------------------------------------------------------

// Rutas para los muebles favoritos del usuario
app.use("/favorite", favoriteRoutes)

//-----------------------------------------------------------------------------------------------

// Rutas para los filtros de los muebles
app.use("/filter", filterRoutes)

//-----------------------------------------------------------------------------------------------

// Rutas para las ordenes de los usuarios
app.use("/order", orderRoutes)

//-----------------------------------------------------------------------------------------------

// Get all orders of user
app.get("/order", (req,res)=>{
    const { id } = req.query; //http://localhost:8081/order?id=1 ejemplo :3
    const query = `CALL getAllOrderOfUser(?)`
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento almacenado', err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, data: result[0]?.[0]})
        }
    })
})

// Update order of user -> states
app.put("/order/:id_order", (req,res)=>{
    const { id_order } = req.params;
    const { state } = req.body;
    const query = `CALL updateStateOrderOfUser(?,?)`
    db.query(query, [id_order, state], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
})

//-----------------------------------------------------------------------------------------------

// User buys a piece of furniture
app.post("/sale", (req, res)=>{
    const { id_order, amount, total_price } = req.body;
    const query = `CALL userBuysFurniture(?,?,?)`
    db.query(query, [id_order, amount, total_price], (err, result)=>{
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