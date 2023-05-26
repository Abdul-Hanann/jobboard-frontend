import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_FAIL,
  FETCH_JOB_LIST_SUCCESS,
  ADD_NEW_JOB,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
  UPDATE_JOB_LIST,
  UPDATE_JOB_LIST_SUCCESS,
  UPDATE_JOB_LIST_FAIL,
  DELETE_JOB_LIST,
  DELETE_JOB_LIST_SUCCESS,
  DELETE_JOB_LIST_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  jobs: [],
  error: {},
  success: false,
  successAdd: false,
  successUpdate: false,
  successDelete: false,
  errorDelete: false,
  isLoading: false,
}
const JobListReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_JOB_LIST:
      return {
        ...state,
        isLoading: true,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }
    case FETCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
        jobs: action.payload,
      }

    case FETCH_JOB_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: action.payload,
      }

    case ADD_NEW_JOB:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case ADD_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successAdd: true,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
        jobs: action.payload,
      }

    case ADD_JOB_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: action.payload,
      }
    case UPDATE_JOB_LIST:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        success: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case UPDATE_JOB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successUpdate: true,
        successAdd: false,
        error: false,
        successDelete: false,
        errorDelete: false,
        jobs: action.payload,
      }

    case UPDATE_JOB_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: action.payload,
      }

    case DELETE_JOB_LIST:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        success: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case DELETE_JOB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        successAdd: false,
        successUpdate: false,
        successDelete: true,
        errorDelete: false,
        error: false,
        jobs: action.payload,
      }

    case DELETE_JOB_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: true,
        error: action.payload,
      }

    default:
      return state
  }
}

export default JobListReducer
