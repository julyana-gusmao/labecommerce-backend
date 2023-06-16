import { TProducts, TUsers } from "./types";

//////////////////users

//array de objetos de usuários com o type TUsers
export const users: TUsers[] = [

    {
        id: "u001",
        name: "Fulano",
        email: "fulano@gmail.com",
        password: "fulano123",
        createdAt: new Date().toISOString()
    },

    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString()
    },

]

//function para criar um usuário novo
function createUser(id: string, name: string, email: string, password: string){
    const newUser: TUsers = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    }

    users.push(newUser)
    console.log("Cadastro realizado com sucesso")

}

//function para pegar todos os usuários, o retorno é vazio, pois não retorna nada além do console.log
// function getAllUsers():void {
//     console.log(users)
// }

////////////////products

//array de objetos de produtos com o type TProducts
export const products: TProducts[] = [

    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },

    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]

//function para criar um produto novo
function createProduct(id:string, name:string, price:number, description:string, imageUrl:string){
    
    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
}

function searchProductByName(name: string) {

    const searchProduct:{} = products.filter((product) => {
       return product.name.toLowerCase().includes(name.toLowerCase())
    })
       console.log(searchProduct)
}    

//function para pegar todos os produtos, com retorno vazio pois só retorna console.log
function getAllProducts():void {
    console.log(products);
}