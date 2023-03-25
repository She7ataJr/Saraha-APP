import userModel from "../../../../DB/model/User.model.js";
import bcryptjs from 'bcryptjs'
import { compare, hash } from "../../../utils/HashAndCompare.js";
import jwt from 'jsonwebtoken'
import { generateToken } from './../../../utils/generateTokenAndVerify.js';
import { asyncHandler } from "../../../utils/errorHandling.js";
import { loginSchema, signupSchema } from "../auth.Validation.js";






export const signup = asyncHandler(
  async (req, res, next) => {
  const validationResult=signupSchema.validate(req.body,{abortEarly:false})
  if (validationResult.error) {
  return res.json({message :"validation error",validationResult})
  }
  const { userName, email, password } = req.body;
  console.log({userName,password,email})
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
    return res.json({ message: "email exist" });
  }
  const hashPassword = hash({ plainText:password });
  // create one by one
  // insert many all in one request
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
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

  const match = compare({plainText:password,hashValue:user.password})

  if(!match){
      return res.json({Message  : "in-valid password"})
  }
  const token = generateToken({ payload: { id: user._id } })
  user.status="online"
  await user.save()
  return res.json({message : "you're LoggedIn ",token})
})