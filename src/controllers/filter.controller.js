import db from "../database/db.js";

// Filter furniture
export const getFilteredFurniture = (req,res)=>{
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
}