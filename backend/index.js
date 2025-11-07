import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from './config/db.js'
import authRouter from './routes/user.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import cartRouter from './routes/cart.routes.js'
import { isAuth } from './middlewares/isAuth.js'

const app=express()
dotenv.config()

ConnectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",methods:["GET","POST","PUT","DELETE","PATCH"],credentials:true}))
app.use("/api/auth",authRouter)
app.use("/api/cart",isAuth,cartRouter)

app.get("/",(req,res)=>{
    res.send("Server Running...")
})

app.listen(process.env.PORT,()=>{
    console.log("Server Listening on Port")
})