const express=require('express');
const app=express();
const mongoose = require('mongoose');
const UserModel=require("./models/userModel");
const LeadModel=require("./models/LeadModel");
const dotenv=require('dotenv')
dotenv.config();

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