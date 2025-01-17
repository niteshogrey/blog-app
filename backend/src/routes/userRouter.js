const express = require('express')
const { getAllUsers, registerUser, loginController, getUserById } = require('../controllers/userController')

const user = express.Router()

user.post('/register', registerUser) // http://localhost:3000/api/v1/user/register

user.post('/login', loginController) // http://localhost:3000/api/v1/user/login

user.get('/user/:id', getUserById)  // http://localhost:3000/api/v1/user/user

user.get('/all-user', getAllUsers)


module.exports = user