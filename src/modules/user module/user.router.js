import Router from 'express'
import * as userController from './controller/user.controller.js'
import * as validators from './user.validation.js'
import { auth } from './../../middleware/auth.middleware.js';
import validation from '../../middleware/validation.middleware.js';
import fileUpload, { fileValidation } from '../../utils/multer.js';
const router = Router()

router.patch('/profilePic',auth,
fileUpload('user/profile',fileValidation.image).single('image'),
userController.profilePic)
router.get('/profile',auth,userController.profile)
router.patch('/password',validation(validators.updatePassword),auth,userController.updateUser)
router.get('/:id/profile',validation(validators.shareProfile),userController.shareProfile)

export default router