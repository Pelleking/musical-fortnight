import express from 'express'
import path from 'path'
import { searchDogs } from './feature/dogSearch/search'
import cors from 'cors'

const app = express()
const port = 3000

const ENABLE_DOGS_SEARCH = true

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())

if (ENABLE_DOGS_SEARCH) {
  app.get('/dogSearch', (req, res) => {
    const query = req.query.query as string | undefined;
    const results = searchDogs(query);
    res.json(results);
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
