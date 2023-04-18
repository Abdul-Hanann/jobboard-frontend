import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_FAIL,
  FETCH_JOB_LIST_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  jobs: [],
  error: {},
  success: false,
  isLoading: false,
}
const JobListReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_JOB_LIST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }
    case FETCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        jobs: action.payload,
      }

    case FETCH_JOB_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default JobListReducer
