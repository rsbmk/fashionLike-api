import supertest from 'supertest'
import { app } from '../index'

export const api = supertest(app)

export const initialUser = [
  {
    name: 'Pedro',
    email: 'Pedor@gmail.com',
    perfilURL: 'estaeslaurldeunafotodeperfil'
  },
  {
    name: 'Maria',
    email: 'Maria@gmail.com',
    perfilURL: 'estaeslaurldeunafotodeperfil'
  }
]
