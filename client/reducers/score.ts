import { CoreReducer } from '../../shared/types'

import {
  ScoreAction,
  GET_SCORE_PENDING,
  GET_SCORE_FULFILLED,
  GET_SCORE_ERROR,
} from '../actions/score'

interface ScoreState {
  score: CoreReducer | undefined
  error: string | undefined
  loading: boolean
}

const initialState: ScoreState = {
  score: undefined,
  error: undefined,
  loading: false,
}

const ScoreReducer = (
  state = initialState,
  action: ScoreAction
): ScoreState => {
  const { type, payload } = action

  switch (type) {
    case GET_SCORE_PENDING:
      return {
        ...state,
        error: undefined,
        loading: true,
      }
    case GET_SCORE_FULFILLED:
      return {
        ...state,
        score: payload,
        loading: false,
      }
    case GET_SCORE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default ScoreReducer
