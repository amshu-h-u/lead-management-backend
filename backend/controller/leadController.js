const leadModel=require("../models/LeadModel");

const createLead=async(req,res)=>{
    console.log(req.user);
    try{
        const lead=await leadModel.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            status:req.body.status,
            source:req.body.source,
            createdBy:req.user.id
        })
        res.status(201).json({message:"Lead created Successfully",lead});
    }catch(err){
        res.status(500).json({error:err.message});
        console.log(err)
    }
}

const getLead=async(req,res)=>{
     
     try{
        let filter={};
        if(req.user.role!=="admin"){
            filter.createdBy=req.user.id;
        }

        if(req.query.status){
            filter.status=req.query.status;
        }
        if(req.query.source){
            filter.source=req.query.source;
        }
        if(req.query.search){
            filter.$or=[
                {name:{$regex:req.query.search,$options:"i"}},
                {email:{$regex:req.query.search,$options:"i"}}
            ]
        }

        if(req.query.from||req.query.to){
            filter.createdAt={};
            if(req.query.from){
                filter.createdAt.$gte=new Date(req.query.from);
            }
            if(req.query.to){
                filter.createdAt.$lte=new Date(req.query.to);
            }
        }

        // const leads=await leadModel.find(filter)
        // res.status(200).json(leads)

        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||5;
        const skip=(page-1)*limit;

        let sortOption={};

        if(req.query.sort==="latest"){
            sortOption.createdAt=-1;
        }else if(req.query.sort==="oldest"){
            sortOption.createdAt=1;
        }

        const totalLeads=await leadModel.countDocuments(filter);

        const leads=await leadModel.find(filter).skip(skip).limit(limit).sort({createdAt:-1});

        res.status(200).json({totalLeads,currentPage:page,totalPages:Math.ceil(totalLeads/limit),leads})

     }catch(err){
         res.status(500).json({error:err.message});
     }
    

    // try{
    //     let leads;
    //     if(req.user.role=="admin"){
    //         leads=await leadModel.find({});
    //     }
    //     else{
    //       leads=await leadModel.find({createdBy:req.user.id});
    //     }
    //     res.status(200).json(leads);

    // }catch(err){
    //      res.status(500).json({error:err.message});
    // }
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

const updateLeadStatus=async(req,res)=>{
    try{
      const leadId=req.params.id;
      const {status}=req.body;
      const lead=await leadModel.findById(leadId);
      if(!lead){
        return res.status(404).json({message:"Lead not found"})
      }
      if(lead.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
        return res.status(403).json({message:"Access denied"})
      }
      lead.status=status;
      await lead.save()
      res.status(200).json({message:"Lead status updated successfully",lead})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const getLeadStat=async(req,res)=>{
    try{
       let filter={};
       if(req.user.role!=="admin"){
        filter.createdBy=req.user.id;
       }
       const totalLeads=await leadModel.countDocuments(filter);
       const newLeads=await leadModel.countDocuments({...filter,status:"New"});
       const contactedLeads=await leadModel.countDocuments({...filter,status:"Contacted"})
       const convertedLeads=await leadModel.countDocuments({...filter,status:"Converted"})
       res.status(200).json({
        totalLeads,newLeads,contactedLeads,convertedLeads
       })
    }catch(err){
        res.status(500).json({error:err.message})
    }
}


// const updateLeadStatus=async(req,res)=>{
//     try{
//     const leadId=req.params.id;
//     const {status}=req.body;
//     const lead=await leadModel.findById(leadId);
//     if(!lead){
//         return res.status(404).json({message:"Lead not found"})
//     }
//     if(lead.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
//         return res.status(403).json({message:"Access denied"});
//     }
//     lead.status=status;
//     await lead.save();

//     res.status(200).json({
//         message:"Lead status updated successfully",lead
//     })
// }catch(err){
//     res.status(500).json({error:err.message})
// }
// }


// const getLeads=async(req,res)=>{
//     try{
//       if(req.user.role=="admin"){
//         await leadModel.find({})
//       }
//       else{
//         await leadModel.find({createdBy:req.user.id});
//       }
//       res.status(200).json(leads);
//     }catch(err){
//         res.status(500).json({error:err.message})
//     }
// }

// const updateLeads=async(req,res)=>{
//     try{
//         let leadId=req.params.id;
//         const lead=await leadModel.findById(leadId);
//         if(!lead){
//             res.status(404).json({message:"Lead not found"})
//         }
//         lead.name=req.body.name||lead.name;
//         lead.email=req.body.email||lead.email;
//         lead.phone=req.body.phone||lead.phone;
//         lead.status=req.body.status||lead.status;
//         lead.source=req.body.source||lead.source;
//         await lead.save();
//         res.status(200).json({message:"Lead updated successfully",lead})
//     }catch(err){
//         res.status(500).json({error:err.message})
//     }
// }

// const deleteLeads=async(req,res)=>{
//     try{
//        let leadId=req.params.id;
//        let lead=await leadModel.findById(leadId);
//        if(!lead){
//         res.status(404).json({message:"User not found"})
//        }
//        if(lead.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
//          res.status(403).json({message:"access denied"})
//        }
//        await leadModel.findByIdAndDelete(leadId);
//        res.status(200).json({message:"Lead deleted successfully"})
//     }catch(err){
//        res.status(500).json({error:err.message})
//     }
// }

module.exports={createLead,getLead,updateLead,deleteLead,updateLeadStatus,getLeadStat};