-- Active: 1687822204931@@127.0.0.1@3306

-------------------- SELECTS -------------------
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM purchases;
SELECT * FROM purchases_products;


---------- SPECIFY SELECT

SELECT users.name FROM users;

SELECT products.name FROM products;

SELECT * FROM products WHERE products.name LIKE '%gamer%';


---------- SELECT COM INNER JOIN
SELECT
purchases.id AS id,
buyer AS buyer,
users.name AS name,
users.email AS email,
purchases.total_price,
purchases.created_at AS data
FROM purchases
INNER JOIN users
ON buyer = users.id;

-------------------- CREATES -------------------


    ----------- Users
CREATE TABLE
    IF NOT EXISTS users(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );


DROP TABLE users;

    
    ----------- Products

CREATE TABLE
    IF NOT EXISTS products(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );


DROP TABLE products;
----------- Purchases

CREATE TABLE
    IF NOT EXISTS purchases(
        id TEXT PRIMARY KEY,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
    );


DROP TABLE purchases;

---------- Purchases Products

CREATE TABLE
    IF NOT EXISTS purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
        FOREIGN KEY (purchase_id) REFERENCES purchases(id)
        ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
		ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
    );


DROP TABLE purchases_products;

DROP TABLE products;
-- -------------------- INSERTS -------------------
-- INSERT INTO
--     users (
--         id,
--         name,
--         email,
--         password
--     )
-- VALUES (
--         'u001',
--         'Fayra',
--         'fayralinda@gmail.com',
--         '123321'
--     ), (
--         'u002',
--         'Alexia',
--         'alexiacris@gmail.com',
--         '1232314'
--     ), (
--         'u003',
--         'Lucca',
--         'luquinha2000@hotmail.com',
--         'sr195812'
--     );


-- INSERT INTO
--     products (
--         id,
--         name,
--         price,
--         description,
--         image_url
--     )
-- VALUES (
--         'p001',
--         'Monitor Gamer',
--         1300,
--         'Lorem Ipsum Lorem',
--         'https://picsum.photos/200'
--     ), (
--         'p002',
--         'Teclado Gamer',
--         400,
--         'Lorem Ipsum Lorem',
--         'https://picsum.photos/200'
--     ), (
--         'p003',
--         'Mousepad RGB',
--         180,
--         'Lorem Ipsum Lorem',
--         'https://picsum.photos/200'
--     ), (
--         'p004',
--         'Controle XBOX',
--         500,
--         'Lorem Ipsum Lorem',
--         'https://picsum.photos/200'
--     ), (
--         'p005',
--         'Cadeira Gamer',
--         1500,
--         'Lorem Ipsum Lorem',
--         'https://picsum.photos/200'
--     );


INSERT INTO
    purchases (
        id,
        buyer,
        total_price
    )
VALUES (
        "c001",
        "u002",
        400.3
    );


--     INSERT INTO purchases_products (purchase_id, product_id, quantity)
--     VALUES ("c001", "p001", 1), ("c002", "p002", 1), ("c002", "p004", 2);

-- -------- Setting the total price as soon as enraised

-- UPDATE purchases
-- SET total_price = 900
-- WHERE id = "c002";

-- ------------- QUERIES ADD AND DELETE

-- INSERT INTO
--     users (
--         id,
--         name,
--         email,
--         password
--     );

-- INSERT INTO products (id, name, price, description, image_url);

-- DELETE FROM users
-- WHERE id = ''
-- DELETE FROM products
-- WHERE id = '';

-- UPDATE products
-- SET
--     id = '',
--     name = '',
--     price = '',
--     description = '',
--     image_url = ''
-- WHERE id = '';