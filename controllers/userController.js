const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill in all the fields')
    }
    //Check if User exists

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)
    //Create User
    const user = await User.create({
        name,
        email,
        password : hashedPass
    })

    if(user){
        res.status(201)
        res.json({
            id : user.id,
            name : user.name
        })
    }
})

const loginUser =  asyncHandler(async (req,res) => {
    const {email,password} = req.body
   //Check for User
   console.log(password)
   const user = await User.findOne({email})
    console.log(user)
   if(user && (await bcrypt.compare(password,user.password))){
    res.status(201)
    res.json({
        id : user.id,
        name : user.name
    })}
    else{
        res.status(404).json({
            status : 404,
            message : "User doesn't exist"
        })
        
    }
}
)

const deleteUser =  asyncHandler(async (req,res) => {
    res.json({
        message : "delete"
    })
})

module.exports = {registerUser, loginUser, deleteUser}