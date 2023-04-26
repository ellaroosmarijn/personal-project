import axios from 'axios'

import { Answer, Score } from '../../shared/types'

export function scoreAnswerApi(answer: Answer) {
  return axios
    .post('/api/v1/answer/score', answer)
    .then((response) => response.data as Score)
}
