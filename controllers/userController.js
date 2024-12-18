const users = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// add user
exports.addUserController = async (req,res)=>{
    console.log("inside addUserController ");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("user already exist... please login")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}
// login
exports.loginController = async(req,res)=>{
    console.log("inside loginController");
    const{email,password} = req.body
    try{
        const exisitingEmail = await users.findOne({email})
        if(exisitingEmail){
                let isUserPasswordMatch = await bcrypt.compare(password,exisitingEmail.password)
                if(isUserPasswordMatch || password==exisitingEmail.password){
                    const token  = jwt.sign({userId:exisitingEmail._id},process.env.JWTPASSWORD)
                    res.status(200).json({user:exisitingEmail,token})
                }else{
                    res.status(404).json("invalid email/password")
                }

        }else{
            res.status(404).json("invalid email/password")
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.editUserController = async(req,res)=>{
    console.log("inside editUserController");
    const {profilePic} = req.body
    const userId = req.userId
    try{
        const exisitingUser = await users.findById({_id:userId})
        exisitingUser.profilePic = profilePic
        await exisitingUser.save()
        res.status(200).json(exisitingUser)
    }catch(err){
        res.status(401).json(err)
    }

    
}

// get all users
exports.getAllUsersController = async(req,res)=>{
    console.log("inside getAllUsersController");
    try{
        const allUsers = await users.find().skip(1)
        res.status(200).json(allUsers)
    }catch(err){
        res.status(401).json(err)
    }
    
}

