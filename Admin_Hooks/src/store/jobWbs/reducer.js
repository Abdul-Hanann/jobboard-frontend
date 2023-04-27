import {
  FETCH_JOB_WBS,
  FETCH_JOB_WBS_FAIL,
  FETCH_JOB_WBS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  jobWbs: [],
  error: {},
  success: false,
  isLoading: false,
}
const JobWbsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_JOB_WBS:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }
    case FETCH_JOB_WBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        jobWbs: action.payload,
      }

    case FETCH_JOB_WBS_FAIL:
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

export default JobWbsReducer
