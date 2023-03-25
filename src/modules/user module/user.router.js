import Router from 'express'
import * as userController from './controller/user.controller.js'
import { auth } from './../../middleware/auth.middleware.js';
const router = Router()

router.get('/profile',auth,userController.profile)
router.patch('/',auth,userController.updateUser)



export default router