import express, { Request, Response } from "express";
import cors from "cors";

import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


//////////////////// GET //////////////////////


app.get('/users', async (req: Request, res: Response) => {

    try {

           // const result = await db.select("*").from("users")
        const result = await db("users")

        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }


})

app.get('/products', async (req: Request, res: Response) => {

    try {
        // const result = await db.select("*").from("products")
        const result = await db("products")
       
        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
})


app.get('/purchases', async (req: Request, res: Response) => {

    try {
        // const result = await db.select("*").from("products")
        const result = await db("purchases")
       
        res.status(200).send(result)

    }catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }

})

// GET PURCHASE BY ID

app.get("/purchases/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const [purchase] = await db("purchases")
        .select(
          "purchases.id as purchaseId",
          "purchases.buyer as purchaseBuyer",
          "users.name as buyerName",
          "users.email as buyerEmail",
          "purchases.total_price",
          "purchases.created_at",
  
        )
        .innerJoin("users", "purchases.buyer", "=", "users.id").where("purchases.id", "=", id)


        if(!purchase){
            res.status(400)
            throw new Error("Id não encontrado")
        }

        const resultPurchaseProduct = await db("purchases_products").select(
            "products.id as productId",
            "products.name",
            "products.price",
            "products.description",
            "products.image_url",
            "purchases_products.quantity"
          ).innerJoin("products", "purchases_products.product_id", "products.id").where("purchases_products.purchase_id", "=", id)


          const result = {
            ...purchase,
            products: resultPurchaseProduct
          }

        res.status(200).send(result)
            
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
})

// GET PRODUCT BY NAME -- PRECISA DO /search **

// app.get('/products/search', async (req: Request, res: Response) => {

    app.get('/products/search', async (req: Request, res: Response) => {

    try {

        const q = req.query.q as string
        const [ product ] = await db("products").where( "name", "LIKE", `%${q}%` )

        if (!q){
            res.status(400)
            throw new Error("Escreva um produto a ser procurado")
        }

        res.status(200).send(product)

        // const q = req.query.q as string

        // const [product] = await db.raw(`
        // SELECT * FROM products
        // WHERE name LIKE "%${q}%";
        // `)

        // if (!product) {
        //     res.status(400)
        //     throw new Error("Produto não encontrado")
        // }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }

})

////CREATE USERS

app.post("/users", async (req: Request, res: Response) => {

    try {
        
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string


        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' precisa ser tipo texto")
        }

        if(typeof name !== "string"){
            res.status(400)
            throw new Error("'name' precisa ser tipo texto")
        }

        if(typeof email !== "string"){
            res.status(400)
            throw new Error("'email' precisa ser tipo texto")
        }

        if(typeof password !== "string"){
            res.status(400)
            throw new Error("'password' precisa ser tipo texto")
        }


        if(id.length < 1 || name.length < 1){
            res.status(400)
            throw new Error ("'id' e 'nome' devem ter mais de 2 caracteres")
        }

        const newUser = {
            id: id,
            name: name, 
            email: email,
            password: password
        }

        await db("users").insert(newUser)

        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
})

////CREATE PRODUCT

app.post("/products", async (req: Request, res: Response) => {

    try {

    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const image_url = req.body.image_url as string

    if(typeof id !== "string"){
        res.status(400)
        throw new Error("'id' precisa ser tipo texto")
    }

    if(typeof name !== "string"){
        res.status(400)
        throw new Error("'name' precisa ser tipo texto")
    }

    if(typeof price !== "number"){
        res.status(400)
        throw new Error("'price' precisa ser tipo número")
    }

    if(typeof description !== "string"){
        res.status(400)
        throw new Error("'description' precisa ser tipo texto")
    }

    if(typeof image_url !== "string"){
        res.status(400)
        throw new Error("'image_url' precisa ser tipo texto")
    }

    if(id.length < 1 || name.length < 1){
        res.status(400)
        throw new Error ("'id' e 'nome' devem ter mais de 2 caracteres")
    }

    
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url
    }

    await db("products").insert(newProduct)
    // const newProduct = await db.raw(`
    // INSERT INTO products (id, name, price, description, image_url)
    // VALUES ("${id}", "${name}", ${price}, "${description}", "${image_url}")
    // `)

    res.status(201).send("Produto cadastrado com sucesso")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
    });


/// CREATE PURCHASE

app.post('/purchases', async (req: Request, res: Response) => {

    try {

        const id = req.body.id as string
        const buyer = req.body.buyer as string
        const totalPrice = req.body.totalPrice as number

        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' precisa ser tipo texto")
        }

        if(typeof buyer !== "string"){
            res.status(400)
            throw new Error("'buyer' precisa ser tipo texto")
        }

        if(typeof totalPrice !== "number"){
            res.status(400)
            throw new Error("'totalPrice' precisa ser tipo número")
        }

        if(id.length < 1 || buyer.length < 1){
            res.status(400)
            throw new Error ("'id' e 'buyer' devem ter mais de 2 caracteres")
        }

        const newPurchase = {
            id: id,
            buyer: buyer,
            totalPrice: totalPrice
        }

        await db("purchases").insert(newPurchase)

        res.status(201).send("Compra cadastrada com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
});


//////DELETE USER BY ID

app.delete("/users/:id", async (req: Request, res: Response) => {

    try{
    const idToDelete = req.params.id
    const [ user ] = await db("users").where({id: idToDelete})

    if(!user){
        res.status(400)
        throw new Error("Id não encontrado")
    }

    await db("users").del().where({id: idToDelete})
    res.status(200).send("Usuário deletado com sucesso")
    
    }catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }})


//DELETE PRODUCT BY ID

app.delete("/products/:id", async (req: Request, res: Response) =>{
    
    try {
        const idToDelete = req.params.id
        const [ product ] = await db("products").where({id: idToDelete})

        if(!product){
            res.status(400)
            throw new Error ("Id não encontrado")
        }

        await db("products").del().where({id: idToDelete})
        res.status(200).send("Produto deletado com sucesso")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
})

//PUT PRODUCT BY ID (EDIT)

app.put("/products/:id", async (req: Request, res: Response) => {

    try {

    const idToEdit = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newDescription = req.body.description as string | undefined
    const newImage_Url = req.body.image_url as string | undefined

    const [ product ] = await db("products").where({ id: idToEdit })

    if(!product){
        res.status(400)
        throw new Error ("Id não encontrado")
    }

    const updatedProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newImage_Url || product.image_url
    }

    await db("products").update(updatedProduct).where({id: idToEdit})
                
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" })
})


/// DELETE PURCHASE BY ID
app.delete('/purchases/:id', async (req: Request, res: Response) => {
    
    try {

    const idToDelete = req.params.id

    const [ purchase ] = await db("purchases").where({id: idToDelete})

    if(!purchase){
        res.status(400)
        throw new Error ("Id não encontrado")
    }

    await db("purchases").del().where({id: idToDelete})

    res.status(200).send("Compra deletada com sucesso")
        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
          } else {
            res.status(500).send("Erro desconhecido.");
          }
    }
})