import { Router } from 'express'
import { User } from '../models/user'
import validEmail from '../utils'
const router = Router()

// create a user
router.post('/users/register', async (req, res, next) => {
  const { name, email, perfilURL } = req.body

  const isValidEmail = validEmail(email)
  if (!name || !email || !perfilURL || !isValidEmail) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const userExist = await User.findOne({ email })
    if (userExist) return res.status(401).json({ error: 'User already exists', userExist })

    const user = await new User({ name, email, perfilURL })
    await user.save() // save user in DB
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

// get all user
router.get('/users', async (req, res) => {
  const allUsers = await User.find({})
  if (!allUsers.length) return res.status(404).json({ message: 'User not found' })

  res.status(200).json(allUsers)
})

// get a user by id
router.get('/users/:email', async (req, res, next) => {
  const { email } = req.params
  const isValidEmail = validEmail(email)

  if (!email || !isValidEmail) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) res.status(404).json({ message: 'User not found' })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

export default router
