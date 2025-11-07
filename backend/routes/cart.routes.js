import express from 'express'
import { addToCart, checkout, deleteFromCart, getCart, updateCart } from '../controllers/cartController.js'

const cartRouter=express.Router()

cartRouter.get("/",getCart)
cartRouter.post("/",addToCart)
cartRouter.delete("/:id",deleteFromCart)
cartRouter.patch("/:id",updateCart)
cartRouter.post("/checkout",checkout)

export default cartRouter