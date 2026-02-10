const jwt=require("jsonwebtoken");

const protect=(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
let token;
        token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next()
    
    }
    catch(err){
       return res.status(401).json({message:"Invalid token"})
    }
}else{
    return res.status(401).json({message:"no token provided"});
}
    
}

module.exports=protect;


