const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const { userModel } = require("../Models/user.model")
const userRouter=express.Router()

/*--------   Register user  request*/
userRouter.post("/register",(req,res)=>{


    const {email,name,password}=req.body
    bcrypt.hash(password,5,async(err,hash)=>{
        try {
            if(err){
                res.status(200).send({"err":err})
            }
            else{
                const user=await userModel.find({email})
                if(!user.length){
                    const newUser=new userModel({...req.body,password:hash})
                    newUser.save()
                    res.status(201).send({"msg":"new user registered", "new user":newUser})
                }
                else{
                    res.status(400).send({"msg":"user already registered"})
                }

            }
        } catch (error) {
            res.status(400).send({"error":error})
            
        }

    })

   
})


/**********   user login request     ************** */

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.find({email})
        bcrypt.compare(password,user[0].password,(err,decoded)=>{
           
            if(err){
                res.status(200).send({"err from bcrypt":err})
            }else{
                if(decoded){
                    const token=jwt.sign({email:user[0].email,userId:user[0]._id},"masai",{expiresIn:"7d"})
               
                    res.status(201).send({"msg":"user is succefully logged in","token":token})

                }
                else{
                    res.status(200).send({"msg":"Password incorrect"})
                }
                

            }
        })
    } catch (error) {
        res.status(400).send({"err":error})
        
    }

    
})







userRouter.post("/login",(req,res)=>{
    res.send("e")
})


module.exports={
    userRouter
}