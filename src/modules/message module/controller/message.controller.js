import { asyncHandler } from "../../../utils/errorHandling.js"
import userModel from "../../../../DB/model/User.model.js";
import messageModel from './../../../../DB/model/message.model.js';

// export const getMessageModule=(req,res,next)=>{
//     return res.json({message:"message module"})
// }
export const sendMessage = asyncHandler(async(req,res,next)=>{
    const {message} = req.body
    const {receiverId}=req.params
    // console.log({message,receiverId});
    const user=await userModel.findById(receiverId)
    if (!user) {
        return next(new Error("There's no account "))   
    }
    const TheMessage= await messageModel.create({message,receiverId})
    return res.status(201).json({message:"send successfully",TheMessage})
})

export const getMessages = asyncHandler(async(req,res,next)=>{
    const {_id}=req.user
    const messages = await messageModel.find({receiverId:_id})
    return res.json({message :"here is your messages",messages})

})

export const deleteMessage =asyncHandler( async (req,res,next)=>{
    const {id}=req.params
    const message = await messageModel.deleteOne({_id:id,receiverId:req.user._id})
    return message?res.status(200).json({ message:"Done"}):
    next(new Error('in-valid message id or Owner id',{cause:400}))
})