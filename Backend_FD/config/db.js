import mongoose from "mongoose";

let dbUrl="mongodb+srv://rxrushi561:rushikesh@foodify.pltedse.mongodb.net/Foodify"
export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then(()=>{
     console.log("DB connected");
    })
    
  } catch (error) {
    console.error("DB connection failed:", error.message);

  }
};
