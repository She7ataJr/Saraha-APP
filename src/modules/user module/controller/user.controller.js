import { asyncHandler } from '../../../utils/errorHandling.js';
import userModel from './../../../DB/model/User.model.js';
import { compare, hash } from '../../../utils/HashAndCompare.js';

export const profilePic=asyncHandler(async(req,res,next)=>{
    return res.json({message:"file uploaded successfully",file:req.file})
})



export const profile= asyncHandler(async (req,res,next)=>
{
   
    const user = await userModel.findById(req.user._id)
    return user? res.json({message :"done",user})
    : next(new Error ("user is not registered"))



})


 export const updateUser= asyncHandler( async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body
    const user = await userModel.findById(req.user._id)
    const match = compare({plainText:oldPassword,hashValue:user.password})
    if(!match){
        return next(new Error('in-valid old password',{cause:400}));
    }
    const hashPassword = hash({plainText:newPassword})
    user.password = hashPassword
    await user.save()
    return res.status(200).json({message : 'done'})
})

export const deleteUser=asyncHandler(async (req,res,next)=>{
   
    const user = await userModel.findByIdAndDelete({_id:req.user._id})
return user? res.json({message :"done",user}):next(new Error ("In-valid account detail"))

})

export const shareProfile = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id).select('userName email profilePic firstName lastName')
    return user?res.status(200).json({message :'done',user}):next(new Error('invalid account ID',{cause:404}))

})