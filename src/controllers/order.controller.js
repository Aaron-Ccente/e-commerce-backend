import db from "../database/db.js";

// Get all orders of user
export const getAllOrderOfUser = (req,res)=>{
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
}

// Create order user
export const createOrderProductUser = (req, res) =>{
    const { id_product, id_user } = req.body;
    const query = `CALL createOrderProductUser(?,?)`;
    db.query(query, [id_user, id_product], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento almacenado', err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}

// Update order of user -> states
export const updateStateOrderOfUser = (req,res)=>{
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
}