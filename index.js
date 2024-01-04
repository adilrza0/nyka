const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const connectionTimeout = require("./Middlewares/connectionTimeout.middleware")
const { userRouter } = require("./Routers/user.router")
const { productRouter } = require("./Routers/product.router")

require("dotenv").config()

const app=express()

app.use(cors())
app.use(connectionTimeout)

app.use(express.json())

app.use("/",userRouter)

app.use("/products",productRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`server running at ${process.env.port}`)
        
    } catch (error) {
        console.log(error)
        
    }
   
})