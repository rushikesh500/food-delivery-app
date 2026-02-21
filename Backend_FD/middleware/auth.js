import jwt from "jsonwebtoken"
import express from "express";

const app = express();

app.use(express.json());

const authMiddleware = async(req,res,next) =>{
   
    const {token}=req.headers;
    if(!token){
       return res.json({success:false,message:"login first"})
    }
    try {
        const decodeToken =jwt.verify(token,process.env.JWT_SECRET)
        if (!req.body) {
            req.body = {};
        }
        req.body.userId =decodeToken.id;
        
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error in auth"})
    }
}

export default authMiddleware;