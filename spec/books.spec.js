const supertest = require('supertest')
const app = require('../src/server.js')
const db = require('../db')
const createBooksTableQuery = require('./helpers/createBooksTableQuery.js')

describe('Books Endpoint', () => {
  beforeAll(async () => {
    await db.query(createBooksTableQuery)
  })
  beforeEach(async () => {
    await db.query('TRUNCATE TABLE "books";')
  })
  afterAll(async () => {
    await db.end()
  })

  describe('GET /books', () => {
    beforeEach(async () => {
      await db.query("INSERT INTO books (title, type, author, topic, publicationDate, pages) VALUES ('voluptatem eligendi cupiditate et', 'Fiction', 'Carolyn Donnelly', 'western', '2020-11-16T21:38:54.789+00:00', 400);")
    })

    it('returns books', async () => {
      const response = await supertest(app).get('/books')
      expect(response.status).toEqual(200)
      expect(response.body.data).not.toEqual(undefined)
      expect(response.body.data.length).toEqual(1)

      const [book] = response.body.data
      expect(book.title).toEqual('voluptatem eligendi cupiditate et')
      expect(book.type).toEqual('Fiction')
      expect(book.author).toEqual('Carolyn Donnelly')
      expect(book.topic).toEqual('western')
      expect(book.pages).toEqual(400)
    })
  })
})
