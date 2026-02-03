const leadModel=require("../models/LeadModel");

const createLead=async(req,res)=>{
    try{
        const lead=await leadModel.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            status:req.body.status,
            source:req.body.source,
            createdBy:req.user.id
        })
        res.status(201).json(lead);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
module.exports={createLead};