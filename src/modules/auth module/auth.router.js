import Router from 'express'
import * as authController from './controller/auth.controller.js'
import validation from '../../middleware/validation.middleware.js';
import { loginSchema, signupSchema } from './auth.Validation.js';

const router = Router()

router.post('/signup',validation(signupSchema),authController.signup)
router.post('/login',validation(loginSchema),authController.login)
router.get('/confirmEmail/:token',authController.confirmEmail)
export default router