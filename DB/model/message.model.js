import mongoose,{ Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
message:{
    type:String,
    required:true
},
receiverId:{
    type:Types.ObjectId,
    ref:"user",
    required:true
}
},{
    timestamps:true
})

const messageModel = mongoose.model.message ||model('message',messageSchema)
export default messageModel