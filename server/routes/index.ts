import express from 'express'

import { rateUserInput } from '../chatgpt/index'
import { TOPICS } from '../../shared/constants'

const router = express.Router()

router.post('/answer/score', async (req, res) => {
  const { text } = req.body
  const viewpoint: string | undefined = req.session.viewpoint
  const topic: string | undefined = req.session.topic

  if (viewpoint == null) {
    return res.status(400).json({ error: 'Please select a viewpoint.' })
  }

  if (topic == null) {
    return res.status(400).json({ error: 'Please request a topic.' })
  }

  if (text == null) {
    return res.status(400).json({ error: 'Please provide an answer.' })
  }

  let userInput
  try {
    userInput = await rateUserInput(viewpoint, topic, text)
  } catch (e) {
    let message = ''
    if (e instanceof Error) {
      message = e.message
    } else {
      message =
        typeof e === 'string'
          ? e
          : 'The AI is unsure how to respond. Please edit your answer and try again.'
    }
    return res.status(400).json({ error: message })
  }
  return res.json(userInput)
})

router.post('/ideology', (req, res) => {
  if (req.body.viewpoint == null) {
    return res.status(400).json({ message: 'Please provide a viewpoint' })
  }

  let opposingViewpoint: 'conservative' | 'liberal' = 'liberal'
  if (req.body.viewpoint === 'liberal') {
    opposingViewpoint = 'conservative'
  }

  req.session.previousTopics = []

  req.session.viewpoint = opposingViewpoint
  res.json({ viewpoint: req.session.viewpoint })
})

router.get('/topic', (req, res) => {
  if (req.session.viewpoint == null) {
    return res.status(400).json('No viewpoint has been defined')
  }

  const validTopics = TOPICS.filter(
    (topic) => !req.session.previousTopics?.includes(topic)
  )
  const randomIndex = Math.floor(Math.random() * validTopics.length)
  const randomTopic = validTopics[randomIndex]

  req.session.topic = randomTopic
  req.session.previousTopics?.push(randomTopic)

  res.json({ viewpoint: req.session.viewpoint, topic: req.session.topic })
})

export default router
