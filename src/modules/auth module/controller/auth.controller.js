import userModel from "../../../../DB/model/User.model.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
import { generateToken } from './../../../utils/generateTokenAndVerify.js';
import { asyncHandler } from "../../../utils/errorHandling.js";
import { loginSchema, signupSchema } from "../auth.Validation.js";
import sendEmail from "../../../utils/sendEmail.js";






export const signup = asyncHandler(
  async (req, res, next) => {
  const validationResult=signupSchema.validate(req.body,{abortEarly:false})
  if (validationResult.error) {
  return res.json({message :"validation error",validationResult})
  }
  const { userName, email, password } = req.body;
  // // console.log({userName,password,email})
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
    return res.json({ message: "email exist" });
  }
  // const token = generateToken({payload:{email},expiresIn:60*5 , signature:process.env.EMAIL_TOKEN})
  const link = `http://localhost:5000/auth/confirmEmail/${token}`
  const html = `<a href="${link}">Click me to confirm your email</a>`
  const info = await sendEmail({to:email,subject:'Confirm Email' ,html})
  if (!info){
    return next(new Error("rejected Email" , {cause:400 }))
  }

  const hashPassword = hash({ plainText:password });

  const user = await userModel.create({userName,email,password: hashPassword});
  return res.json({ message: "signed up successfully ", user: user._id });
}
)

export const login =asyncHandler( async (req, res, next) => {

  const validationResult=loginSchema.validate(req.body,{abortEarly:false})
  if (validationResult.error) {
    return res.json({message :"validation error",validationResult})
  }
  const { email, password } = req.body       
  const user = await userModel.findOne({ email})
  if(!user){
      return res.json({message : "In-Valid Email"})
  }
  if(!user.confirmEmail){
    return next(new Error('you must confirm your email first',{cause:400}))
  }
  const match = compare({plainText:password,hashValue:user.password})

  if(!match){
    return res.json({Message  : "in-valid password"})
}
const token = generateToken({ payload: { id: user._id } })
user.status="online"
await user.save()
return res.json({message : "you're LoggedIn ",token})
})

export const confirmEmail = asyncHandler(async(req,res,next)=>{
  const {token}=req.params
  const {email} = verifyToken({token,signature:process.env.EMAIL_TOKEN})
  const user = await userModel.updateOne({email},{confirmEmail:true})
  return user.modifiedCount? res.status(200).redirect('http://localhost:5000/auth/login')
                            :res.status(404).send('not registered account')
})

