import { Router } from 'express'
const router = Router()

// controllers
import { register } from '../controllers/auth'
import { getAllUsers, getUserByEmail } from '../controllers/user'

// middlewares
// import { validID } from '../middleware/validID'

// create a user
router.post('/users/register', register)

// get all user
router.get('/users', getAllUsers)

// get a user by email
router.get('/users/:email', getUserByEmail)

export default router
