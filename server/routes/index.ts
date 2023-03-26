import express from 'express'

import { rateUserInput } from '../chatgpt/index'

const router = express.Router()

// score user answers using chatGPT
router.post('/answer/score', async (req, res) => {
  const { viewpoint, topic, text } = req.body
  const userInput = await rateUserInput(viewpoint, topic, text)
  return res.json(userInput)
})

export default router
