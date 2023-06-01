import {
  FETCH_JOB_WBS,
  FETCH_JOB_WBS_FAIL,
  FETCH_JOB_WBS_SUCCESS,
  FETCH_JOB_WBS_BY_ID,
  FETCH_JOB_WBS_FAIL_BY_ID,
  FETCH_JOB_WBS_SUCCESS_BY_ID,
  ADD_NEW_JOB_WBS,
  ADD_JOB_WBS_SUCCESS,
  ADD_JOB_WBS_FAIL,
  UPDATE_JOB_WBS,
  UPDATE_JOB_WBS_SUCCESS,
  UPDATE_JOB_WBS_FAIL,
  DELETE_JOB_WBS,
  DELETE_JOB_WBS_SUCCESS,
  DELETE_JOB_WBS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  jobWbs: [],
  error: {},
  success: false,
  successAdd: false,
  successUpdate: false,
  successDelete: false,
  errorDelete: false,
  isLoading: false,
}
const JobWbsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_JOB_WBS:
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
    case FETCH_JOB_WBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
        jobWbs: action.payload,
      }

    case FETCH_JOB_WBS_FAIL:
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
    case FETCH_JOB_WBS_BY_ID:
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
    case FETCH_JOB_WBS_SUCCESS_BY_ID:
      return {
        ...state,
        isLoading: false,
        success: true,
        successAdd: false,
        successUpdate: false,
        error: false,
        successDelete: false,
        errorDelete: false,
        jobWbs: action.payload,
      }

    case FETCH_JOB_WBS_FAIL_BY_ID:
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

    case ADD_NEW_JOB_WBS:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case ADD_JOB_WBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // success: true,
        successAdd: true,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
        jobWbs: action.payload,
      }

    case ADD_JOB_WBS_FAIL:
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

    case UPDATE_JOB_WBS:
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

    case UPDATE_JOB_WBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successUpdate: true,
        successAdd: false,
        error: false,
        successDelete: false,
        errorDelete: false,
        jobWbs: action.payload,
      }

    case UPDATE_JOB_WBS_FAIL:
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

    case DELETE_JOB_WBS:
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

    case DELETE_JOB_WBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        successUpdate: false,
        successDelete: true,
        errorDelete: false,
        error: false,
        jobWbs: action.payload,
      }

    case DELETE_JOB_WBS_FAIL:
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

export default JobWbsReducer
