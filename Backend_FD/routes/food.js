import express from "express"
import {addFood,foodList,removeFood}from "../controller/foodControl.js"
import upload from "../config/multer.js"



let foodRoute =express.Router()



foodRoute.post("/add",upload.single("image"),addFood)
foodRoute.get("/list",foodList)
foodRoute.delete("/remove/:id",removeFood)




export default foodRoute