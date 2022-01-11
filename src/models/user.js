import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  // password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  perfilURL: { type: String, required: false }
}, {
  timestamps: true,
  versionKey: false
})

export const User = model('User', userSchema)
