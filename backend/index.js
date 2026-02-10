const express=require('express');
const app=express();
const mongoose = require('mongoose');
const route=require("./routes/userRoutes")
const leadRoute=require("./routes/leadRoutes")
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config();

app.use(cors())
app.use(express.json())
app.use("/api/auth",route);
app.use("/api/lead",leadRoute)

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})



const start=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB")
}
catch(err){
    console.log(err);
}}

start()