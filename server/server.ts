import { join } from 'node:path'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'

import routes from './routes'

declare module 'express-session' {
  interface SessionData {
    viewpoint?: 'conservative' | 'liberal'
    topic?: string
    previousTopics?: string[]
  }
}

if (process.env.SESSION_SECRET == undefined) {
  throw Error('SESSION_SECRET is not defined')
}

const server = express()

server.use(bodyParser.json())

server.use(
  session({
    secret: process.env.SESSION_SECRET || 'anything',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' },
  })
)
server.use('/api/v1', routes)

server.use(express.static(join(__dirname, 'public')))

server.use((_, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

export default server
