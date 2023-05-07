import Router from 'express'
import * as MessageController from './controller/message.controller.js'
import validation from './../../middleware/validation.middleware.js';
import * as validators from './message.validation.js'
import auth from '../../middleware/auth.middleware.js';
const router = Router()

router.post('/:receiverId',validation(validators.sendMessage),MessageController.sendMessage)
router.get('/',auth,MessageController.getMessages)
router.delete('/:id',validation(validators.deleteMessage),auth,MessageController.deleteMessage)

export default router