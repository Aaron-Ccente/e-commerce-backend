import express from 'express'
import cors from 'cors'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import db from './database/db'
import { PORT } from './config/config.js';
const app = express();
app.use(cors())
app.use(express.json())

// const absolutePath = join(__dirname, 'index.html');

app.get("/",(_,res)=>{
    res.send("Hello")
    // res.sendFile(absolutePath)
})

app.listen(PORT, ()=>{
    console.log("Server listen in port: ", PORT)
})