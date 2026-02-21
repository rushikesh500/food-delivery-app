import express from "express"
import {loginUser , registerUser} from "../controller/userControl.js"

const userRoute=express.Router()

userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)

export default userRoute;

