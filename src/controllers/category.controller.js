import db from "../database/db.js";

// Crear categoría
export const createCategory = (req, res) => {
    const { name } = req.body;
    const query = `CALL createCategory(?)`;
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error('Error al ejecutar el procedimiento almacenado:', err);
            return res.status(500).json({ message: err.message || 'Error al crear una categoria' });
        }
        res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje });
    });
};

//Obtener las categorias
export const getAllCategories = (_, res) =>{
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
}

//Actualizar una categoria
export const updateCategory = (req, res)=>{
    const { id } = req.params;
    const { name } = req.body;
    const query = `CALL updateCategory(?,?)`
    db.query(query, [id, name], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({ message: err.message || 'Error al actualizar la categoria'})
        }
        else{
            return res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}

//Eliminar una categoria
export const deleteCategory = (req, res)=>{
    const { id } = req.params;
    const query = `CALL deleteCategory(?)`;
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento almacenado', err)
            return res.status(500).json({ message: err.message})
        }
        else{
            return res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje})
        }
    })

}