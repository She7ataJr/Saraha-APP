import bcrypt from 'bcryptjs'

export const hash = ({plainText,salt=process.env.SALT_ROUND}={})=>{
    const hash=bcrypt.hashSync(plainText,parseInt(salt))
    return hash

}

export const compare = ({plainText,hashValue}={})=>{
    const match=bcrypt.compareSync(plainText,hashValue)
    return match

}