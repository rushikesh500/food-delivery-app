import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser= async(req,res)=>{
   let {email, password} =req.body
   try {
        // finding user
       const user= await userModel.findOne({email})
       if (!user ) {
         return res.json({ success: false, message: "User Not found" });
       }
       //check password
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch ) {
         return res.json({ success: false, message: "Invalid Password" });
       }
       //give access
         const token =createToken(user._id)
       return res.json({ success: true, message: "Login Success" ,token, userId: user._id,});
       //passing token
     
   } catch (error) {
          console.log(error);
          res.json({ success: false, message: "Error Login" });
   }
}

// creating token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser= async(req,res)=>{
   let {name , email, password} =req.body
   try {
       //checking email
       console.log("JWT SECRET:", process.env.JWT_SECRET)

       const checkEmail= await userModel.findOne({email})
       if(checkEmail){
       return res.json({success:false,message:"Email already exits"})
       }
        //checking enail is valid
       if(!validator.isEmail(email)){
       return res.json({success:false,message:"Email not Valid"})    
       }
       //checking password
       if(password.length <=5){
       return res.json({success:false,message:"password must cantain 6 digit"})    
       }
       //using bcrypt
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
        //using userRegister Module
       const user= await userModel.create({
          name,
          email,
          password:hashedPassword
       })
       const token =createToken(user._id)
       res.json({success:true,token}
        
       )
   } catch (error) {
        res.json({success:false,token})
   }


}


export  {loginUser,registerUser}