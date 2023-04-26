import { Viewpoint } from '../../shared/types'

import {
  ViewpointAction,
  FETCH_VIEWPOINT_PENDING,
  FETCH_VIEWPOINT_FULFILLED,
  FETCH_VIEWPOINT_ERROR,
} from '../actions/viewpoint'

interface ViewpointState {
  view: Viewpoint | undefined
  error: string | undefined
  loading: boolean
}

const initialState: ViewpointState = {
  view: undefined,
  error: undefined,
  loading: false,
}

const ViewpointReducer = (
  state = initialState,
  action: ViewpointAction
): ViewpointState => {
  const { type, payload } = action

  switch (type) {
    case FETCH_VIEWPOINT_PENDING:
      return {
        ...state,
        error: undefined,
        loading: true,
      }
    case FETCH_VIEWPOINT_FULFILLED:
      return {
        ...state,
        view: payload,
        loading: false,
      }
    case FETCH_VIEWPOINT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default ViewpointReducer
