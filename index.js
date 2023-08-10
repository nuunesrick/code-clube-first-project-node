const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

// app.get('/users', (request, response) => {
//     return response.send('Hello Node')
// })


//  app.listen(port, ()=>{
//     console.log(`Server Started on port ${port} `)
//  })

/* - QUERY PARAM => meusite.com/users?nome=richard&age=25 //FILTROS
   - ROUTE PARAMS => /users/2   // buscar, deletar ou atualizar algo especifico
   - REQUEST BODY -  {"name": "Richard", "age":}

- GET =-> Buscar informação no back end --- VERIFICAR USUARIO
-POST =-> criar informação no back end --- CRIA UM NOVO USUARIO
-PUT / PATCH =-> alterar/ atualizar informação no bak end ---- ATUALIZAÇÃO DO USUARIO
-DELETE =-> Deletar informação no back End --- DELETAR O USUARIO

- middlewares -- interceptador - poder de parar ou alterar dados
--------------------------------------------------------
   */
// app.get('/users/:id', (request, response) => {

// const {id} = request.params

// console.log(id)


//     return response.json({id})
// })

// app.listen(port, () =>{
//     console.log(`Server Started on port ${port}`)
// })

// criação de usuarios 
const users = []
const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)


    if (index < 0) {

        return response.status(404).json({ message: "User not found" })
    }

    request.userIndex = index
    request.userId = id
    next()


}


app.get('/users', (request, response) => {

    return response.json(users)

})


app.post('/users', (request, response) => {
    const { name, age, address } = request.body


    const user = { id: uuid.v4(), name, age, address } // montar usuario

    users.push(user) // puxa o usuariio para a variavel

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => { //atualização de usuario


    const { name, age, address } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age, address }


    users[index] = updateUser

    return response.json(updateUser)

})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex


    users.splice(index, 1)


    return response.status(204).json()

})











app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})