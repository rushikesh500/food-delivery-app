import foodModel from "../models/foodModel.js";



// add food item
const addFood = ( async(req,res) => {
    let {name,price,category} =req.body

   await foodModel.create({
        name,
        price,
        image:req.file.filename,
        category
    })
    try {
      
        res.json({success: true,
                  message: "Food Added"})
    } catch (error) {
        console.log("food cant add",error)
        res.json({success:false,
                  message:"Error"})
    }
 
})



// show List item
const foodList = ( async(req,res) => {
    
    try {
        let food_list = await foodModel.find({})
        res.json({success: true,
                  data:food_list})
    } catch (error) {
        console.log(error)
        res.json({success:false,
                  message:"Error"})
    }
 
})

//Remove food from list
const removeFood = ( async(req,res) => {
    
    try {
        let food_list = await foodModel.findByIdAndDelete(req.params.id)
        res.json({success: true,message:"food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
 
})

export  { addFood,foodList,removeFood};