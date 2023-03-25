import userModel from "../../DB/model/user.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/generateTokenAndVerify.js";


export const auth=asyncHandler( async (req,res,next)=>{

    
        const {authorization}=req.headers
  
    if (!authorization?.startsWith(process.env.TOKEN_SIGNATURE)) {
        // return res.json({Message :"In-valid Bearer key"})
        return next(new Error ("In-valid Bearer key"))
    }
    const token = authorization.split(process.env.TOKEN_SIGNATURE)[1]

    const decoded = verifyToken({token})
    console.log({decoded});
    if (!decoded?.id) {
        // return res.json({Message:"in-valid token payload"})
        return next(new Error ("In-valid Token Payload"))

    }
    const authUSer=await userModel.findById(decoded.id).select("userName email role status")

    if(!authUSer){
        // return res.json({Message:"not registered account"})
        return next(new Error ("Not registered account"))

    }
    req.user = authUSer
    return next()
    
})

export default auth