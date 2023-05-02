import {
  GET_JOB_LIST_FAIL,
  GET_JOB_LIST_SUCCESS,
  ADD_JOB_LIST_SUCCESS,
  ADD_JOB_LIST_FAIL,
  UPDATE_JOB_LIST_SUCCESS,
  UPDATE_JOB_LIST_FAIL,
  DELETE_JOB_LIST_SUCCESS,
  DELETE_JOB_LIST_FAIL,
  GET_APPLY_JOB_SUCCESS,
  GET_APPLY_JOB_FAIL,
  DELETE_APPLY_JOB_SUCCESS,
  DELETE_APPLY_JOB_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  jobsList: [],
  error: {},
  jobApply: [],
}

const JobReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobsList: action.payload,
      }

    case GET_JOB_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobsList: [...state.jobsList, action.payload],
      }

    case ADD_JOB_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobsList: state.jobsList.map(jobList =>
          jobList.id.toString() === action.payload.id.toString()
            ? { jobList, ...action.payload }
            : jobList
        ),
      }

    case UPDATE_JOB_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobsList: state.jobsList.filter(
          jobList => jobList.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_JOB_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_APPLY_JOB_SUCCESS:
      return {
        ...state,
        jobApply: action.payload,
      }
    case GET_APPLY_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_APPLY_JOB_SUCCESS:
      return {
        ...state,
        jobApply: state.jobApply.filter(
          data => data.id.toString() !== action.payload.toString()
        ),
      }
    case DELETE_APPLY_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default JobReducer
