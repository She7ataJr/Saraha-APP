import joi from 'joi'

export const sendMessage={

    body:joi.object({
        message:joi.string().alphanum().required()
    }).required(),

    params:joi.object({
        receiverId:joi.string().max(24).min(24).required()
    }).required()
}
export const deleteMessage = {
    params:joi.object({
        id:joi.string().min(24).max(24).required()
    })
}