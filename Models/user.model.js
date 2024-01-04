const { default: mongoose } = require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    avatar:String,
    email:String,
    password:String,
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now },
},{versionKey:null})

const userModel=mongoose.model("user",userSchema)

module.exports={
    userModel
}