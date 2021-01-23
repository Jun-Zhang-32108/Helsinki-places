require('dotenv').config()

let PLACES_URL = process.env.PLACES_URL
let PORT = process.env.PORT

module.exports = {
  PLACES_URL,
  PORT
}