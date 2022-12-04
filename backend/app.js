const express=require("express");
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
}
const path=require("path")
const bodyParser=require("body-parser")
const errormiddleware=require("./middleware/error");
const cookieParser=require("cookie-parser")
const fileUpload=require("express-fileupload")

const user=require("./routes/userroute");
const blog=require("./routes/blogroute")
const app=express()


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(fileUpload())

app.use("/api",user);
app.use("/api",blog)


app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
});

app.use(errormiddleware)
module.exports=app;