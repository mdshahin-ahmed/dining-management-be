import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { userControllers } from './user.controller'
const router = express.Router()

router.get('/me', auth(ROLE.admin, ROLE.user), userControllers.getMe)
router.get('/all', auth(ROLE.admin), userControllers.getUsers)

export const userRouter = router
