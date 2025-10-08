import express from 'express'
import path from 'path'
const app = express()
const port = 3000

const ENABLE_DOGS_SEARCH = false

app.get('/', (req, res) => {
  res.send('Hello World!')
})

if (ENABLE_DOGS_SEARCH) {
  app.get('/dogssearch', (req, res) => {
    res.send('TODO: dogssearch')
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
