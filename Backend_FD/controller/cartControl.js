import userModel from "../models/userModel.js";

// add to cart logic
const addToCart = async (req,res)=>{
    try {
        let {userId , itemId}=req.body
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
             }
        const cartData =user.cart
        if(!cartData[itemId]){
             cartData[itemId]=1;
        }
        else{
             cartData[itemId]+=1;
        }
        await userModel.findByIdAndUpdate(userId,{cart: cartData })
        res.json({success:true,message:"Added to Cart"})
    } catch (error) {
        console.log(error)  
         res.json({ success: false, message: "Error for add cart" })
    }
}

// remove from cart logic
const removeFromCart = async (req,res)=>{
    try {
        let {userId,itemId}=req.body
        const user =await userModel.findById(userId)
        let cartData=user.cart;
        if(cartData[itemId] > 1){
            cartData[itemId]-=1;
        }
        else{
           delete cartData[itemId]
        }
        await userModel.findByIdAndUpdate(userId,{cart: cartData })
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error)  
        res.json({ success: false, message: "Error for remove from cart" })
    }

}

const getCart = async (req,res,)=>{
     try {
         let {userId}=req.body
         const user = await userModel.findById(userId)
         res.json({success:true,cartData:user.cart})
     } catch (error) {
        console.log(error)  
         res.json({ success: false, message: "Error" })
     }
}

export {addToCart,getCart,removeFromCart}