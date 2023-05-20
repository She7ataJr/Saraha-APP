import multer from "multer";

function fileUpload(){
    const storage =multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads')
        },
        filename:(req,file,cb)=>{
            console.log({file});
            cb(null,file.originalname)
        }
    })

    const upload = multer({dist:'uploads',storage})
    return upload
}
export default fileUpload