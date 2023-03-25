import { asyncHandler } from '../../../utils/errorHandling.js';
import userModel from './../../../../DB/model/user.model.js';




export const profile= asyncHandler(async (req,res,next)=>
{
   
    const user = await userModel.findById(req.user._id)
    return user? res.json({message :"done",user})
    : next(new Error ("user is not registered"))



})


 export const updateUser= asyncHandler( async(req,res,next)=>{
    const {userName}=req.body
    const user = await userModel.findByIdAndUpdate(req.user._id,{userName},{new:true})
    return user? res.json({message :"done",user}):next(new Error ("In-valid account detail"))

})

export const deleteUser=asyncHandler(async (req,res,next)=>{
   
    const user = await userModel.findByIdAndDelete({_id:req.user._id})
return user? res.json({message :"done",user}):next(new Error ("In-valid account detail"))

})