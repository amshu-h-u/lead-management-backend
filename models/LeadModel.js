const mongoose=require("mongoose")

const leadSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    status:{type:String,enum:["New","Contacted","Converted"],default:"New"},
    source:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true})

const LeadModel=mongoose.model("Lead",leadSchema);
module.exports=LeadModel;