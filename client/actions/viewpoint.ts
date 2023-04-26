import type { ThunkAction } from '../store'

import { Viewpoint } from '../../shared/types'
import { viewpointApi } from '../api/index'

export const FETCH_VIEWPOINT_PENDING = 'FETCH_VIEWPOINT_PENDING'
export const FETCH_VIEWPOINT_FULFILLED = 'FETCH_VIEWPOINT_FULFILLED'
export const FETCH_VIEWPOINT_ERROR = 'FETCH_VIEWPOINT_ERROR'

export type ViewpointAction =
  | { type: typeof FETCH_VIEWPOINT_PENDING; payload: void }
  | { type: typeof FETCH_VIEWPOINT_FULFILLED; payload: Viewpoint }
  | { type: typeof FETCH_VIEWPOINT_ERROR; payload: string }

export function getViewpointPending(): ViewpointAction {
  return {
    type: FETCH_VIEWPOINT_PENDING,
  } as ViewpointAction
}

export function getViewpointFulfilled(view: Viewpoint): ViewpointAction {
  return {
    type: FETCH_VIEWPOINT_FULFILLED,
    payload: view,
  }
}

export function scoreViewpointRejected(error: string): ViewpointAction {
  return {
    type: FETCH_VIEWPOINT_ERROR,
    payload: error,
  }
}

export function getViewpointAction(view: Viewpoint): ThunkAction {
  return (dispatch) => {
    dispatch(getViewpointPending())
    return viewpointApi(view)
      .then((view) => {
        dispatch(getViewpointFulfilled(view))
      })
      .catch((error: Error) => {
        dispatch(scoreViewpointRejected(error.message))
        throw error
      })
  }
}
