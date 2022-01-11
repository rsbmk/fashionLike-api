import { Router } from 'express'
const router = Router()

const users = [
  {
    id: 1,
    name: 'John',
    email: 'hola@gmail.com'
  },
  {
    id: 2,
    name: 'pepe',
    email: 'pepe@gmail.com'
  },
  {
    id: 3,
    name: 'Rick',
    email: 'rick@gmail.com'
  }
]

// create a user
router.post('/users/register', (req, res) => {
  const { name, email, password } = req.body

  if (users.find((user) => user.email === email)) { return res.status(201).json({ message: 'User already exists' }) }

  const user = {
    id: users.length + 1,
    name,
    email,
    password
  }

  users.push(user) // User.create({user})
  res.status(200).json(user)
})

// login a user
router.post('/users/login', (req, res) => {
  const { email, password } = req.body

  const logUser = users.find((user) => user.email === email && user.password === password)

  if (!logUser) return res.status(201).json({ message: 'User not found' })

  res.status(200).json(logUser)
})

// delete a user
router.delete('/users/:userId', (req, res) => {
  const { userId } = req.params

  users.filter((user) => user.id !== Number(userId)) // User.deleteOne({id})
})

// update a user
router.put('/users/:userId', (req, res) => {
  const { userId } = req.params                     
  const { name, password, email } = req.body

  const userNewArry = users.filter((user) => user.id !== Number(userId))
  res.json([...userNewArry, { userId, name, password, email }])
  // User.UpdateOne({ id: userId }, { name, password, email }) // mongoDB
})

// get all user
router.get('/users', (req, res) => {
  if (!users.length) return res.status(500).json({ message: 'There is no users' })
  res.status(200).json(users)
})

// get a user by id
router.get('/users/:userId', (req, res) => {
  const { userId } = req.params

  const user = users.find((user) => user.id === Number(userId))

  if (!user) return res.status(404).json({ message: 'User not found' })

  res.status(200).json(user)
})

export default router
