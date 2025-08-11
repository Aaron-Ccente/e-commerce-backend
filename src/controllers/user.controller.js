import db from "../database/db.js"

//Crear un usuario
export const createUser = (req,res)=>{
    const { email, password, name, lastname, phone, role } = req.body
    const query = `CALL createUser(?,?,?,?,?,?)`
    db.query(query, [email, password, name, lastname, phone, role], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({ message: err.message || 'Error al crear usuario'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}

//Para el login de los usuarios
export const loginUserOrAdmin = (req,res)=>{
    const {email, password} = req.body;
    const query = `CALL loginUserOrAdmin(?,?)`
    db.query(query, [email, password], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al iniciar sesión'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}

//Para editar el perfil de un usuario
export const updateUser = (req, res)=>{
    const { id } = req.params;
    const { name, lastname, phone } = req.body;
    const query = `CALL updateUser(?,?,?,?)`;
    db.query(query, [id, name, lastname, phone], (err,result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al editar en usuario'})
        }
        else{
            return res.status(200).json({ success: true, message: result[0]?.[0]?.mensaje })
        }
    })
}

//Para eliminar la cuenta de usuario
export const deleteUser = (req, res)=>{
    const {id} = req.params;
    const query = `CALL deleteUser(?)`
    db.query(query, [id], (err, result)=>{
        if(err){
            console.log('Error al ejecutar el procedimiento', err)
            return res.status(500).json({message: err.message || 'Error al eliminar la cuenta de usuario'})
        }
        else{
            return res.status(200).json({success: true, message: result[0]?.[0]?.mensaje})
        }
    })
}
