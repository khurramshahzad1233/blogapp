const catchasyncerror=require("../middleware/catchasyncerror")
const Errorhandler=require("../utils/errorhandler.js")
const userdata=require("../models/userschema");
const cloudinary=require("cloudinary");
const sendtoken=require("../utils/sendtoken");
const crypto=require("crypto")
const sendEamil=require("../utils/sendEmail")

exports.getallusercontroller=catchasyncerror(async(req,res,next)=>{
    const alluser=await userdata.find();
    res.status(200).json({
        success:true,
        alluser,
    })
})


exports.registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatar",
        width:150,
        crop:"scale",
    });
    const {name,email,password}=req.body;
    const user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });
    sendtoken(user,201,res)
    
});


exports.loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(new Errorhandler("plz enter your email and password",400))
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("invalid email or password", 400))
    };
    const matchpassword=await user.comparepassword(password);
    if(!matchpassword){
        return next(new Errorhandler("invalid email or password",401))
    };
    
    sendtoken(user,200,res)
});

exports.logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    // const user=await userdata.findById(req.user.id);
    // if(!user){
    //     return next(new Errorhandler("plz login to access the resource",400))
    // };
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"logout successfully"
    })
});

exports.getprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",400))
    };
    res.status(200).json({
        success:true,
        user,
    })
});

exports.getsingleusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    res.status(200).json({
        success:true,
        user,
    })
});

exports.updateusercontroller=catchasyncerror(async(req,res,next)=>{
    const newuserdata={
        name:req.body.name,
        email:req.body.email,
    };
    if(req.body.avatar!==""){
        const user=await userdata.findById(req.user.id);
        let imageid=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageid);
        const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatar",
            width:150,
            crop:"scale"
        });
        newuserdata.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    };
    const user=await userdata.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndMody:false,
    });
    res.status(200).json({
        success:true,
    })
});


exports.updatepasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id).select("+password");
    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    const matchpssword=await user.comparepassword(req.body.oldpassword);
    if(!matchpssword){
        return next(new Errorhandler("incorrect old password",401))
    };
    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("password not matched",400))
    };
    user.password=req.body.newpassword;
    await user.save();
    sendtoken(user,200,res)
});

exports.updaterolecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    const newuserdata={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    await userdata.findByIdAndUpdate(req.params.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndMody:false,
    });
    res.status(200).json({
        success:true,
        message:"Update role successfully"
    })
});


exports.deleteusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id).populate("blog");
    if(!user){
        return next(new Errorhandler("user not found with this id",404))
    };
    let blogs=user.blog;
    if(blogs!==undefined){
        blogs.forEach(async(blog)=>{
            for(let i=0;i<blog.images.length; i++){
                await cloudinary.v2.uploader.destroy(blog.images[i])
            }
            await blog.remove();
        });
    }
    const imageid=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageid);
    await user.remove();
    res.status(200).json({
        success:true,
        
    })
});


exports.forgotpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("user does not exist with this id",404))
    };
    const resettoken=user.getresettoken();
    await user.save({validateBeforeSave:false});
    const resetpasswordurl=`${req.protocol}://${req.get("host")}/reset/password/${resettoken}`
    const message=`your reset password token is :- /n/n ${resetpasswordurl} /n/n -: if your did not order this key then ignore this message`


    try {
        await sendEmail({
            email:user.email,
            subject:"pssword recovery",
            message,
        })
        
    } catch (error) {
        user.resetpasswordtoken=undefined;
        user.resetpasswordexpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new Errorhandler("internal server error",500))
        
    }
});

exports.resetpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const resettoken=req.params.token;
    const resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex");
    const user=await userdata.findOne({
        resetpasswordtoken,
        resetpasswordexpire:{$gt:Date.now()}
    });
    if(!user){
        return next(new Errorhandler("your jwt token has been expired",401))
    };
    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("password are not same",400))
    };
    user.password=req.body.newpassword;
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;
    await user.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })

});

exports.getallblogofsingleusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id).populate("blog");
    if(!user){
        return next(new Errorhandler("plz login to access the resource",400))
    };
    res.status(200).json({
        success:true,
        user,
    })
})