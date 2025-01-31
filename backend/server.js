import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// app config

const app = express();
const port=process.env.port || 4000;

// middleware

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API Working");
})

//DB connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
});