import { User } from '../models/user'
import validEmail from '../utils'

const register = async (req, res, next) => {
  const { name, email, perfilURL } = req.body

  const isValidEmail = validEmail(email)
  if (!name || !email || !perfilURL || !isValidEmail) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(401).json({ error: 'User already exists', userExist })
    }

    const user = await new User({ name, email, perfilURL })
    await user.save() // save user in DB
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export { register }
