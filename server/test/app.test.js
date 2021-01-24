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

test('call undefined endpoint', async () => {
  const unknow_endpoint_responese = {"error": "unknown endpoint"}
  const response = await api.get('/api/notes')
  expect(response.body).toStrictEqual(unknow_endpoint_responese)
})

test('api return 10 places', async () => {
  const response = await api.get('/api/items')
  expect(response.body.pageOfItems).toHaveLength(10)
})

test('a specific place is within the returned places', async () => {
  const response = await api.get('/api/items')
  const placeNames = response.body.pageOfItems.map(r => r.name)
  expect(placeNames).toContain('Aarikka')
})