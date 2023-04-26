import axios from 'axios'

import { Viewpoint, Answer, Score, CoreReducer } from '../../shared/types'

export function scoreAnswerApi(answer: Answer) {
  return axios
    .post('/api/v1/answer/score', answer)
    .then((response) => response.data as Score)
}

export function viewpointApi(viewpoint: Viewpoint) {
  return axios
    .post('/api/v1/ideology', { viewpoint })
    .then((response) => response.data as Viewpoint)
}

export function topicApi() {
  return axios
    .get('/api/v1/topic')
    .then((response) => response.data as CoreReducer)
}
