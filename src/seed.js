import db from "./database/db.js"

const user = ` INSERT INTO user(name, lastname, email, password, image, phone, credit) VALUES 
                               ('Aaron', 'Ccente Rojas', 'aronccente@gmail.com', 'password123', 'imagen', '+51959085189', 100.20),
                               ('Prueba', 'Ccente Prueba', 'aronccente@gmail.com', 'password123', 'imagen', '+51959085180', 200.20)
                               ;`


db.query(user, (err, result) => {
    if (err) {
        console.log(err);
        return 'Error al insertar datos';
    } else {
        console.log('Datos insertados correctamente', result);
        return 'Datos insertados correctamente';
    }
});