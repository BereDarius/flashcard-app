const express = require('express')
const userRouter = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    getAllUsers } = require('../controllers/userController')
const { protect }  = require('../middleware/authMiddleware')

userRouter.post('/', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', protect, getMe)
userRouter.get('/all', getAllUsers)

module.exports = userRouter