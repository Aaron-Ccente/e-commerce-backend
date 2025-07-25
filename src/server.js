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




app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})