import mongoose from 'mongoose'
import { server } from '../index'
import { User } from '../src/models/user'
import { api, initialUser } from './helpers.users'

// antes de cada test
beforeEach(async () => {
  // jest.setTimeout(15000) // cambia el tiempo maximo de espera de todos los test
  await User.deleteMany({})
  // secuencial
  for (const user of initialUser) {
    const userObj = new User(user)
    await userObj.save()
  }
})

describe('apiUseres', () => {
  test('get all users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialUser.length)
  })

  test('agregar un nuevo usuario', async () => {
    const newUser = {
      name: 'usuario nuevo',
      email: 'nuevo@gmail.com',
      perfilURL: 'estaeslaurldeunafotodeperfil'
    }

    await api
      .post('/api/users/register')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const resUsers = await api.get('/api/users/').expect(200)

    expect(resUsers.body).toHaveLength(initialUser.length + 1)
  })

  test('no aguega usuario sin email', async () => {
    await api
      .post('/api/users/register')
      .send({ name: 'usuario nuevo', perfilURL: 'estaeslaurldeunafotodeperfil' })
      .expect(400)
  })

  test('busca un usuario por email', async () => {
    const response = await api.get('/api/users/' + initialUser[0].email).expect(200)
    expect(response.body.name).toBe(initialUser[0].name)
  })
})

describe('controlando los errores', () => {
  test('registrar un unsuario sin nombre', async () => {
    await api.post('/api/users/register')
      .send({ email: 'esteEs@unUsuario.com', perfilURL: 'estaeslaurldeunafotodeperfil' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('un email existente', async () => {
    await api.post('/api/users/register')
      .send({ name: 'usuario nuevo', email: initialUser[0].email, perfilURL: 'estaeslaurldeunafotodeperfil' })
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('un email mal formateado', async () => {
    await api.get('/api/users/holacomoestas')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('un email que no existe', async () => {
    await api.get('/api/users/rsbmk@gmail.com')
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })
})

// despues de todo los test
afterAll(async () => {
  // await User.deleteMany({})
  await server.close()
  await mongoose.connection.close()
})
