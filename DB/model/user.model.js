import mongoose,{ Schema, model,Types } from "mongoose";

const userSchema = new Schema({
userName:{
    type:String,
    required:true,
},
firstName:{
    type:String
},
lastName:{
    type:String
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
age:{
    type:Number
},
phone:{
    type:String,
},
confirmEmail:{
    type:Boolean,
    default:false
},
status:{
    type:String,
    default:'offline',
    enum:['offline','online','blocked']
},
role:{
    type:String,
    default:'user',
    enum:['user','admin']
},
gender:{
    type:String,
    default:'male',
    enum:['male','female']
}
},{
    timestamps:true
})

const userModel = mongoose.models.user || model('user',userSchema)
export default userModel