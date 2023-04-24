import type { ThunkAction } from '../store'

import { Score, Answer } from '../../shared/types'
import { scoreAnswerApi } from '../api/index'

export const GET_SCORE_PENDING = 'GET_SCORE_PENDING'
export const GET_SCORE_FULFILLED = 'GET_SCORE_FULFILLED'
export const GET_SCORE_ERROR = 'SCORE_ERROR'

export type ScoreAction =
  | { type: typeof GET_SCORE_PENDING; payload: void }
  | { type: typeof GET_SCORE_FULFILLED; payload: Score }
  | { type: typeof GET_SCORE_ERROR; payload: string }

export function getScorePending(): ScoreAction {
  return {
    type: GET_SCORE_PENDING,
  } as ScoreAction
}

export function getScoreFulfilled(score: Score): ScoreAction {
  return {
    type: GET_SCORE_FULFILLED,
    payload: score,
  }
}

export function scoreRequestRejected(error: string): ScoreAction {
  return {
    type: GET_SCORE_ERROR,
    payload: error,
  }
}

export function getScoreAction(answer: Answer): ThunkAction {
  return (dispatch) => {
    dispatch(getScorePending())
    return scoreAnswerApi(answer)
      .then((score) => {
        dispatch(getScoreFulfilled(score))
      })
      .catch((error: Error) => {
        dispatch(scoreRequestRejected(error.message))
        throw error
      })
  }
}
