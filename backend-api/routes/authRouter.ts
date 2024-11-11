import {Router} from 'express'
import { checkIfUserExists } from '../middlewares/checkUser'
import {checkUserData} from '../middlewares/checkUserData'
import { loginUser, registerUser } from '../controllers/authController'
import {upload} from '../middlewares/uploadFile'



const authRouter : Router = Router()

authRouter.post('/register', upload.single('image'), checkUserData(true), checkIfUserExists(false), registerUser)
authRouter.post('/login', checkUserData(false), checkIfUserExists(true), loginUser)

export default authRouter
