import axios from 'axios'

import { Answer } from '../../shared/types'

export function scoreAnswer(answer: Answer) {
  return axios.post('/api/v1/answer/score', answer)
}
