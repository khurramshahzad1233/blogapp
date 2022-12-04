const catchasyncerror=require("./catchasyncerror")
const Errorhandler=require("../utils/errorhandler")
const userdata=require("../models/userschema")
const jwt=require("jsonwebtoken")


exports.authuser=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhandler("plz login to access the resource",400))
    };
    const accessdata=await jwt.verify(token,process.env.jwt_secret_key);
    req.user=await userdata.findById(accessdata.id);
    next()
});


exports.authrole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler("not authroized,401"))
        };
        next()
    }
}
