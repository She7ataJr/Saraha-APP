import joi from 'joi'

export const sendMessage={

    body:joi.object({
        message:joi.string().alphanum().required()
    }).required(),

    params:joi.object({
        receiverId:joi.string().max(24).min(24).required()
    }).required()
}