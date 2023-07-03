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
        created_at TEXT NOT NULL
    );


    
    ----------- Products

CREATE TABLE
    IF NOT EXISTS products(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );


----------- Purchases

CREATE TABLE
    IF NOT EXISTS purchases(
        id TEXT PRIMARY KEY,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );


---------- Purchases Products

CREATE TABLE
    IF NOT EXISTS purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INT NOT NULL
    );



-------------------- INSERTS -------------------
INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Fayra',
        'fayralinda@gmail.com',
        '123321',
        '26-06'
    ), (
        'u002',
        'Alexia',
        'alexiacris@gmail.com',
        '1232314',
        '26-06'
    ), (
        'u003',
        'Lucca',
        'luquinha2000@hotmail.com',
        'sr195812',
        '26-06'
    );


INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'p001',
        'Monitor Gamer',
        1300,
        'Lorem Ipsum Lorem',
        'https://picsum.photos/200'
    ), (
        'p002',
        'Teclado Gamer',
        400,
        'Lorem Ipsum Lorem',
        'https://picsum.photos/200'
    ), (
        'p003',
        'Mousepad RGB',
        180,
        'Lorem Ipsum Lorem',
        'https://picsum.photos/200'
    ), (
        'p004',
        'Controle XBOX',
        500,
        'Lorem Ipsum Lorem',
        'https://picsum.photos/200'
    ), (
        'p005',
        'Cadeira Gamer',
        1500,
        'Lorem Ipsum Lorem',
        'https://picsum.photos/200'
    );


INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        "c001",
        "u001",
        400.3,
        "26/03/2023"
    ), (
        "c002",
        "u002",
        700.2,
        "26/03/2023"
    ), (
        "c003",
        "u001",
        200.9,
        "29/03/2023"
    );


    INSERT INTO purchases_products (purchase_id, product_id, quantity)

-------- Setting the total price as soon as enraised

UPDATE purchases
SET total_price = 900
WHERE id = "c002";

------------- QUERIES ADD AND DELETE

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    );

INSERT INTO products (id, name, price, description, image_url);

DELETE FROM users
WHERE id = ''
DELETE FROM products
WHERE id = '';

UPDATE products
SET
    id = '',
    name = '',
    price = '',
    description = '',
    image_url = ''
WHERE id = '';