const { default: mongoose } = require("mongoose");

const productSchema=mongoose.Schema({
    name:String,
    picture:String,
    description:String,
    gender:String,
    category:String,
    price:Number,
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now },


},{versionKey:null})

const productModel=mongoose.model("product",productSchema)

module.exports={
    productModel
}