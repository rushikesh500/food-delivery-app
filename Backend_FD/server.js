import express from "express"
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/food.js";
import userRoute from "./routes/user.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import cors from "cors";
import 'dotenv/config'

const app = express();
//db connection
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.get("/", async(req, res) => {
  res.send("Backend");
});

//api endpoint
app.use("/api/food",foodRoute)
app.use("/api/user",userRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order",orderRoute)

//server create
const port =process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port 3000");
});
