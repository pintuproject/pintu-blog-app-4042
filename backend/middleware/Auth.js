const jwt=require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware=async(req,res,next)=>{
    const{authorization}=req.headers
    if(!authorization){
        return res.status(401).json({message:"unauthorized"})
    }
    const token = authorization.split(" ")[1];
     
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
         req.userId=decoded.id
         const userData=await User.findById(req.userId)
         req.author=userData.name
     
    }
    catch(error){
        return res.status(401).json({message:"errror unauthorized"})
    }
    next()
}

module.exports=authMiddleware;