import express from "express"
import authMiddleware from "../middleware/auth.js"
import { addToCart,removeFromCart,getCart } from "../controller/cartControl.js"

let cartRoute =express.Router()

cartRoute.post("/addToCart",authMiddleware,addToCart)
cartRoute.post("/removeFromCart",authMiddleware,removeFromCart)
cartRoute.post("/getCart",authMiddleware,getCart)




export default cartRoute