import db from "../database/db.js";

// User buys a piece of furniture
export const userBuysFurniture = (req, res)=>{
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
}