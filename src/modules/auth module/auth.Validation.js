import joi from 'joi'

export const signupSchema=joi.object({
    userName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword:joi.string().valid(joi.ref('password')).required()
})

export const loginSchema=joi.object({
    email:joi.string().required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
})