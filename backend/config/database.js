import mongoose from 'mongoose';

export const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://dharmika:Dharmii123@cluster0.wce1s.mongodb.net/food-delivery")
    .then(()=>console.log("DB Connected"));
    
}