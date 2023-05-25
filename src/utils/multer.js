import multer from "multer";
import path from 'path'
import fs from 'fs'
import nanoid from 'nanoid'
import fileURLToPath from 'url'

const __direname = path.dirname(fileURLToPath(import.meta.url)) 
export const fileValidation = {
    image:['image/jpeg','image/jpg','image/png','image/gif'],
    file:['application/pdf','application/msword']
}
function fileUpload(customPath='general',customValidation=[]){
    const fullPath =  path.join(__direname,`../uploads/${customPath}`)
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true})
    }
    const storage =multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,fullPath)
        },
        filename:(req,file,cb)=>{
            const uniqueFileName= nanoid()+'_'+file.originalname
            file.dest=`uploads/${customPath}/${uniqueFileName}`
            cb(null,uniqueFileName)
        }
    })

    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb('in-valid file format',false)
        }
    }
    const upload = multer({fileFilter,storage})

    return upload
}
export default fileUpload