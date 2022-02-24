import mongoose from 'mongoose'

export const validID = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Missing params' })
  }
  next()
}
