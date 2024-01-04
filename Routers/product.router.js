const express=require("express")
const { productModel } = require("../Models/product.model")

const productRouter=express.Router()

productRouter.get("/",async(req,res)=>{
    try {
        const products=await productModel.find()
        res.status(200).send({"data":products})
        
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
})

productRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const product=await productModel.find({_id:id})
        res.status(200).send({"data":product[0]})
        
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
})


productRouter.post("/",async(req,res)=>{
    try {
        const newProduct = productModel(req.body)
        await newProduct.save()
        res.status(201).send({"msg":"product added","product":newProduct})
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
})


// Endpoint to update a product by ID
productRouter.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,{...req.body,updated_at:new Date()},
        { new: true }
      );
      res.status(204).send({"msg":"product updated"});
    } catch (error) {
      res.status(500).json({ "error": error });
    }
  });



  // Endpoint to delete a product by ID
productRouter.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      await productModel.findByIdAndDelete(productId);
      res.status(202).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports={
    productRouter
}