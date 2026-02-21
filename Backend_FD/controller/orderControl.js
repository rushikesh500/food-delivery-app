import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"

const placeOrder = async (req,res) => {
    try {
        let {userId,items,address,amount}=req.body
        const newOrder= await orderModel.create({
           userId,
           items,
           address,
           amount
        })

         res.json({
            success: true,
            orderId: newOrder._id
        });
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

const userOrders = async(req,res)=>{
   try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({ success:true ,data:orders});
   } catch (error) {
          res.json({ success:false  });
   }
}

//listing orders for admin
const listOrders = async(req,res)=>{
   try {
        const orders = await orderModel.find({})
        res.json({ success:true ,data:orders});
   } catch (error) {
        console.log(error)
        res.json({ success:false  });
   }
}

//updating status
const updateStatus = async(req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error to update"})
    }
    
}

export  {placeOrder,userOrders,listOrders,updateStatus}