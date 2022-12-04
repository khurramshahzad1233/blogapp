const Errorhandler=require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{
    err.message=err.message||"internal server error";
    err.statusCode=err.statusCode||500;

    if(err.name==="CastError"){
        const message="invalid resource not found try again plz";
        err=new Errorhandler(message,400)
    };
    if(err.code===11000){
        const message="dublicate key error try again plz";
        err=new Errorhandler(message,400)
    };
    if(err.name==="jsonWebTokenError"){
        const message="your json web token is invalid ";
        err=new Errorhandler(message,400)
    };
    if(err.name==="TokenExpiredError"){
        const message="your json web token is expired, try again plz"
        err=new Errorhandler(message,400);

    };
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}