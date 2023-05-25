import authRouter from './modules/auth module/auth.router.js'
import userRouter from './modules/user module/user.router.js'
import messageRouter from './modules/message module/message.router.js'
import connectDB from './../DB/connectDB.js';
import { globalErrorHandling } from './utils/errorHandling.js';
import fileURLToPath from 'url'


const __direname = path.direname(fileURLToPath(import.meta.url))

const initApp=(app,express)=>{
    app.use(express.json({}))
    app.use('/uploads',express.static(path.join(__direname,'/uploads')))
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/message',messageRouter)
    app.all("*",(req,res,next)=>{
        return res.json({message:"Error 404 Not found"})
    })
    app.use(globalErrorHandling)
    connectDB()
}

export default initApp