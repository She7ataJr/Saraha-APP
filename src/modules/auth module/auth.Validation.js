import joi from 'joi'
import { generalFields } from '../../middleware/validation.middleware.js'

export const signupSchema=joi.object({
    userName:joi.string().alphanum().min(2).max(25).required().messages({
        'string.empty':'please Enter Your username',
        'any.required':'username is required'
    }),
    email:generalFields.email,
    // password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    password : generalFields.password,
    cPassword: generalFields.cPassword.valid(joi.ref('password'))
})

export const loginSchema=joi.object({
    email:generalFields.email,
    // password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    password:generalFields.password
})