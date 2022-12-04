const catchasyncerror=require("../middleware/catchasyncerror")
const Errorhandler=require("../utils/errorhandler");
const cloudinary=require("cloudinary")
const blogdata=require("../models/blogschema");
const userdata=require("../models/userschema")
const Apifeature=require("../utils/apifeature")

exports.getallblogcontroller=catchasyncerror(async(req,res,next)=>{
    const allblog=await blogdata.find();
    res.status(200).json({
        success:true,
        allblog
    })
});


exports.searchblogcontroller=catchasyncerror(async(req,res,next)=>{
    const resultperpage=5;
    const blogcount=await blogdata.countDocuments();
    const apifeature=new Apifeature(blogdata.find(),req.query)
    .search()
    .filter()
    .pagination(resultperpage);

    let blogs=await apifeature.query;
    const filterblogcount=blogs.length;

    res.status(200).json({
        success:true,
        blogs,
        filterblogcount,
        resultperpage,
        blogcount,
    })
});


exports.createblogcontroller=catchasyncerror(async(req,res,next)=>{
    let images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images)

    }else{
        images=req.body.images;
    };

    let imageslink=[];
    for(let i=0; i<images.length; i++){
        const mycloud=await cloudinary.v2.uploader.upload(images[i],{
            folder:"blog"
        });
        imageslink.push({
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        })
    };
    req.body.images=imageslink;
    req.body.user=req.user.id;

    const blog=await blogdata.create(req.body);
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    if(blog){
        user.blog.push(blog);
        await user.save({validateBeforeSave:false})
    };
    res.status(201).json({
        success:true,
        blog,
    })
});


exports.updateblogcontroller=catchasyncerror(async(req,res,next)=>{
    let blog=await blogdata.findById(req.params.id);
    if(!blog){
        return next(new Errorhandler("blog not found",404))
    };

    let images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images)
    }else{
        images=req.body.images;
    };

    let imageslink=[];
    if(images!==undefined){
        for(let i=0; i<blog.images.length; i++){
            await cloudinary.v2.uploader.destroy(blog.images[i].public_id)

        };
        for(let i=0; i<images.length; i++){
            let mycloud=await cloudinary.v2.uploader.upload(images[i],{
                folder:"blog"
            });
            imageslink.push({
                public_id:mycloud.public_id,
                url:mycloud.secure_url,
            })
        };
    };
    req.body.images=imageslink;
    blog=await blogdata.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        blog,
    })
});


exports.deleteblogcontroller=catchasyncerror(async(req,res,next)=>{
    const blog=await blogdata.findById(req.params.id).populate("user");
    if(!blog){
        return next(new Errorhandler("blog not found",404))
    };
    for(let i=0; i<blog.images.length; i++){
        await cloudinary.v2.uploader.destroy(blog.images[i].public_id)
    };
    await blog.user.blog.remove(blog);
    await blog.user.save({validateBeforeSave:false});
    await blog.remove();
    res.status(200).json({
        success:true,
    })
});

exports.getsingleblogcontroller=catchasyncerror(async(req,res,next)=>{
    const blog=await blogdata.findById(req.params.id).populate("user");
    if(!blog){
        return next(new Errorhandler("blog not found",404))
    };
    res.status(200).json({
        success:true,
        blog,
    })
});

exports.createblogreviewcontroller=catchasyncerror(async(req,res,next)=>{
    const {blogid,rating,comment,name}=req.body;
    const review={
        name:name,
        rating:Number(rating),
        comment,
    };
    const blog=await blogdata.findById(blogid);
    if(!blog){
        return next(new Errorhandler("blog not exist",404))
    };
    blog.review.push(review);
    blog.numofreview=blog.review.length;

    let sum=0;
    blog.review.forEach((rev)=>{
        sum+=rev.rating
    });
    blog.ratings=sum/blog.review.length;
    await blog.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })

});


