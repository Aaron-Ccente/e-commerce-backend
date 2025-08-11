import db from "../database/db.js";

// Get all the user's favorite furniture
export const getAllFavorites = (req, res)=>{
    const {id} = req.body;
    const query = `CALL getAllFavorites(?)`
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log("Error al ejecutar el procedimiento", err)
            return res.status(500).json({message: err.message || "Error al obtener los muebles favoritos"})
        }
        else{
            return res.status(200).json({success: true, data: result[0]?.[0]})
        }
    })
}

//Add favorites products for users
export const createFavoriteProduct = (req, res)=>{
    const { id_user, id_product } = req.body;
    const query = `CALL createFavoriteProduct(?,?)`
    db.query(query, [id_user, id_product], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}

// Delete user's favorite furniture
export const deleteFavoriteProduct = (req, res)=>{
    const {id_product} = req.params;
    const query = `CALL deleteFavorite(?)`
    db.query(query, [id_product], (err, result)=>{
        if(err){
            console.log("Error al ejecutar el procedimiento almacenado", err)
            return res.status(500).json({message: err.message})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}