import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

describe('apiUseres', () => {
  test('ver si nos responde un json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('con mas de un usuario en el array', async () => {
    const resApi = await api.get('/api/users').expect(200)
    expect(resApi.body).toHaveLength(3)
  })
})

//
afterAll(() => {
  mongoose.connection.close()
})
