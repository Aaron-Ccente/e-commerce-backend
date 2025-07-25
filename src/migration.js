const forniture = `IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'forniture')
                    CREATE TABLE IF NOT EXISTS forniture (
                    id_forniture INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255),
                    description VARCHAR(400)
                    );`