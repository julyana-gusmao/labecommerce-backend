import { users, products } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


////ENDPOINTS

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

//Endpoint para procurar um produto pelo nome
app.get("/products", (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProducts[] = products.filter((product) => { return product.name.toLowerCase().includes(q.toLowerCase())})

    if(result.length >= 1){
        res.status(200).send(result)
    }else{
        res.status(200).send(products)
    }
});

//Endpoint para criar um usuário novo
app.post("/users", (req: Request, res: Response) => {

    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string
    const createdAt = new Date().toISOString() as string

    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt
    } 

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")

})

//Endpoint para criar um produto novo
app.post("/products", (req: Request, res: Response) => {

    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    } 

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")

})