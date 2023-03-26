import { join } from 'node:path'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const server = express()

server.use(bodyParser.json())

server.use('/api/v1', routes)

server.use(express.static(join(__dirname, 'public')))

export default server
