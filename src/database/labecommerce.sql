-- Active: 1687822204931@@127.0.0.1@3306


------------ Users
CREATE TABLE IF NOT EXISTS users(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    
    SELECT * FROM users;

INSERT INTO
    users (id, name, email, password, created_at)
VALUES (
        'u001',
        'Fayra',
        'fayralinda@gmail.com',
        '123321',
        '26-06'
    ),
    (
        'u002',
        'Alexia',
        'alexiacris@gmail.com',
        '1232314',
        '26-06'
    ),
    (
        'u003',
        'Lucca',
        'luquinha2000@hotmail.com',
        'sr195812',
        '26-06'
    );

 
    ----------- Products
    CREATE TABLE IF NOT EXISTS products(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );
    
     SELECT * FROM products;

     INSERT INTO products (id, name, price, description, image_url)
     VALUES
     ('p001', 'Monitor Gamer', 1300, 'Lorem Ipsum Lorem', 'https://picsum.photos/200'),
     ('p002', 'Teclado Gamer', 400, 'Lorem Ipsum Lorem', 'https://picsum.photos/200'),
     ('p003', 'Mousepad RGB', 180, 'Lorem Ipsum Lorem', 'https://picsum.photos/200'),
     ('p004', 'Controle XBOX', 500, 'Lorem Ipsum Lorem', 'https://picsum.photos/200'),
     ('p005', 'Cadeira Gamer', 1500, 'Lorem Ipsum Lorem', 'https://picsum.photos/200');


     ---------- Queries SELECT
     SELECT users.name FROM users;
     SELECT products.name FROM products;

     SELECT * FROM products
     WHERE products.name LIKE '%gamer%';

    
    ------------- QUERIES ADD AND DELETE
    INSERT INTO users (id, name, email, password, created_at);

    INSERT INTO products (id, name, price, description, image_url);

    DELETE FROM users
    WHERE id = ''

    DELETE FROM products
    WHERE id = '';


    UPDATE products
    
    SET id = '',
    name = '',
    price = '',
    description = '',
    image_url = ''
    
    WHERE id = '';
