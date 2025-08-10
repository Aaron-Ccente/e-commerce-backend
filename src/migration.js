import db from "./database/db.js"

const dropTables = `DROP TABLE IF EXISTS user, product, user_order, sale, user_favorite_product, category, product_category;`

const user = `CREATE TABLE IF NOT EXISTS user (
                    id_user INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50),
                    lastname VARCHAR(50),
                    email VARCHAR(100) UNIQUE,
                    password VARCHAR(50),
                    image LONGTEXT,
                    phone VARCHAR(30) NOT NULL UNIQUE,
                    credit DECIMAL(20,2)
                    );`

const product = `CREATE TABLE IF NOT EXISTS product (
                    id_product INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50),
                    price DECIMAL(10,2),
                    image LONGTEXT,
                    description VARCHAR(200)
                    );`

const user_order = `CREATE TABLE IF NOT EXISTS user_order (
                    id_order INT PRIMARY KEY AUTO_INCREMENT,
                    id_user INT,
                    id_product INT,
                    date_order DATETIME DEFAULT CURRENT_TIMESTAMP,
                    state ENUM('cancelado', 'pendiente', 'completado'),
                    FOREIGN KEY (id_user) REFERENCES user(id_user),
                    FOREIGN KEY (id_product) REFERENCES product(id_product)
                    );`

const sale = `CREATE TABLE IF NOT EXISTS sale (
                    id_sale INT PRIMARY KEY AUTO_INCREMENT,
                    id_order INT,
                    amount TINYINT,
                    date_sale DATETIME DEFAULT CURRENT_TIMESTAMP,
                    total_price DECIMAL(20,2),
                    FOREIGN KEY (id_order) REFERENCES user_order(id_order)
                    );`

const user_favorite_product = `CREATE TABLE IF NOT EXISTS user_favorite_product (
                    id_user_favorite_product INT PRIMARY KEY AUTO_INCREMENT,
                    id_user INT,
                    id_product INT,
                    date_saved DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (id_user) REFERENCES user(id_user),
                    FOREIGN KEY (id_product) REFERENCES product(id_product)
                    );`

const category = `CREATE TABLE IF NOT EXISTS category (
                    id_category INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50)
                    );`

const product_category = `CREATE TABLE IF NOT EXISTS product_category (
                    id_product_category INT PRIMARY KEY AUTO_INCREMENT,
                    id_product INT,
                    FOREIGN KEY (id_product) REFERENCES product(id_product)
                    );`




const migration = `${dropTables}
                   ${user}
                   ${product}
                   ${user_order}
                   ${sale}
                   ${user_favorite_product}
                   ${category}
                   ${product_category}`

db.query(migration, (err,result)=>{
    if(err){
        console.log(err)
        return 'Error al crear tablas';
    }
    else{
        console.log('Tablas creadas correctamente', result)
        return 'Tablas creadas correctamente';
    }
})
