import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, {
  timestamps: true,
  versionKey: false
})

export const User = model('User', userSchema)
