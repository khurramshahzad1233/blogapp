const mongoose=require("mongoose")
const kittySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"plz enter your blog title"],
    },
    category:{
        type:String,
        required:[true,"plz enter blog category"]
    },
    description:{
        type:String,
        required:[true,"plz enter your blog details"]
    },
    ratings:{
        type:Number,
        default:0,
        required:true,
    },
    numofreview:{
        type:Number,
        required:true,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    review:[
        {
            name:{
                type:String,
                required:true,

            },
            rating:{
                type:Number,
                required:[true,"plz choose your rating"]
            },
            comment:{
                type:String,
                required:[true,"plz enter your review"]
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    }
});
const blogdata=mongoose.model("blog",kittySchema)
module.exports=blogdata;