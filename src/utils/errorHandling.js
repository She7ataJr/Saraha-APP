



export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return res.json({message:"catch error",err,stack:err.stack})
        })
    }
}



export const globalErrorHandling=(err,req,res,next)=>{

    if(err){
        return res.json({Message :err.message})
    }
}