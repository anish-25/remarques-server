const express = require('express')
const router = express.Router()
const {registerUser, loginUser, deleteUser} = require('../controllers/userController')

//Register

router.post('/register',registerUser )

//Login

router.post('/login',loginUser)

//Delete

router.post('/delete',deleteUser)

module.exports = router
