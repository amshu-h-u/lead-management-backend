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

const getLead=async(req,res)=>{
    try{
        let leads;
        if(req.user.role=="admin"){
            leads=await leadModel.find({});
        }
        else{
          leads=await leadModel.find({createdBy:req.user.id});
        }
        res.status(200).json(leads);

    }catch(err){
         res.status(500).json({error:err.message});
    }
}

const updateLead=async(req,res)=>{
   try{
    const leadId=req.params.id;
    const lead=await leadModel.findById(leadId);
    if(!lead){
        return res.status(404).json({message:"Lead not found"})
    }
   
    if(lead.createdBy.toString()!==req.user.id && req.user.role!="admin"){
        return res.status(403).json({message:"Not allowed"})
    }
    
    lead.name=req.body.name||lead.name;
    lead.email=req.body.email||lead.email;
    lead.phone=req.body.phone||lead.phone;
    lead.status=req.body.status||lead.status;
    lead.source=req.body.source||lead.source;

    await lead.save();
    res.status(200).json({message:"Lead updated successfully",lead})
   }catch(err){
    res.status(500).json({error:err.message})
   }
}

const deleteLead=async(req,res)=>{
    try{
       let leadId=req.params.id;
       const lead=await leadModel.findById(leadId);
       if(!lead){
        return res.status(404).json({message:"Lead not found"});
       }
       
       if(lead.createdBy.toString!==req.user.id && req.user.role!=="admin"){
       return res.status(403).json({message:"Access denied"});
       }

       await leadModel.findByIdAndDelete(leadId);
       res.status(200).json({message:"Lead deleted successfully"})
    }catch(err){
     res.status(500).json({error:err.message})
    }
}

module.exports={createLead,getLead,updateLead,deleteLead};