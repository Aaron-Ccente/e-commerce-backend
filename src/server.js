import express from 'express'
import cors from 'cors'
import categoryRouters from './routes/category.routes.js'
import userRouters from './routes/user.routes.js'
import categoryRoutes from './routes/product.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'
import filterRoutes from './routes/filter.routes.js'
import orderRoutes from './routes/order.routes.js'
import saleRoutes from './routes/sale.routes.js'

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

// Rutas para las ventas
app.use("/sale", saleRoutes)

//-----------------------------------------------------------------------------------------------

app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})