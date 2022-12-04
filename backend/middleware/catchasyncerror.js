module.exports=(currentfunction)=>(req,res,next)=>{
    Promise.resolve(currentfunction(req,res,next)).catch(next)
}