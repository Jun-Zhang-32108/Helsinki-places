const supertest = require('supertest')
const http = require('http')
const app = require('../app').app

const api = supertest(app)

test('places list are returned as json', async () => {
  await api
    .get('/api/items')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
