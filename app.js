import express from 'express'
import userRouter from './src/routes/user.js'
const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(express.json())

// routes
app.use('/api', userRouter)

// export default app
module.exports = app
