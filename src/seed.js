import db from "./database/db.js"

const user = ` INSERT INTO user(name, lastname, email, password, image, phone, credit) VALUES 
                               ('Aaron', 'Ccente Rojas', 'aronccente@gmail.com', 'password123', 'imagen', '+51959085189', 100.20),
                               ('Prueba', 'Ccente Prueba', 'aronccente2@gmail.com', 'password123', 'imagen', '+51959085180', 200.20)
                               ;`

const product = ` INSERT INTO product(name, price, image, description) VALUES 
                               ('Producto 1', 100.50, 'imagen1', 'Descripción del producto 1'),
                               ('Producto 2', 200.75, 'imagen2', 'Descripción del producto 2')
                               ;`

const user_order = ` INSERT INTO user_order(id_user, id_product, state) VALUES 
                               (1, 1, 'pendiente'),
                               (2, 2, 'completado')
                               ;`

const sale = ` INSERT INTO sale(id_order, amount, total_price) VALUES 
                               (1, 1, 100.50),
                               (2, 2, 200.75)
                               ;`

const user_favorite_product = ` INSERT INTO user_favorite_product(id_user, id_product) VALUES 
                               (1, 1),
                               (2, 2)
                               ;`

const category = ` INSERT INTO category(name) VALUES 
                               ('Categoría 1'),
                               ('Categoría 2')
                               ;`

const product_category = ` INSERT INTO product_category(id_product) VALUES 
                               (1),
                               (2)
                               ;`

const seedData = `
                   ${user}
                   ${product}
                   ${user_order}
                   ${sale}
                   ${user_favorite_product}
                   ${category}
                   ${product_category}
                   `

db.query(seedData, (err, result) => {
    if (err) {
        console.log(err);
        return 'Error al insertar datos';
    } else {
        console.log('Datos insertados correctamente', result);
        return 'Datos insertados correctamente';
    }
});