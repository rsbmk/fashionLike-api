import { User } from '../models/user'
import validEmail from '../utils'

const getAllUsers = async (req, res, next) => {
  const allUsers = await User.find({})
  if (!allUsers.length) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(allUsers)
}

const getUserByEmail = async (req, res, next) => {
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
}

export { getAllUsers, getUserByEmail }
