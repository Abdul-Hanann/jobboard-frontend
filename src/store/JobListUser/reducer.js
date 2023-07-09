import {
  FETCH_JOBLIST_USER,
  FETCH_JOBLIST_USER_FAIL,
  FETCH_JOBLIST_USER_SUCCESS,
  FETCH_JOBLIST_USER_FOR_CALENDAR,
  FETCH_JOBLIST_USER_FAIL_FOR_CALENDAR,
  FETCH_JOBLIST_USER_SUCCESS_FOR_CALENDAR,
  FETCH_ALL_TECHNICIANS,
  FETCH_ALL_TECHNICIANS_SUCCESS,
  FETCH_ALL_TECHNICIANS_FAIL,
  FETCH_TECHNICIAN,
  FETCH_TECHNICIAN_FAIL,
  FETCH_TECHNICIAN_SUCCESS,
  ADD_NEW_TECHNICIAN,
  ADD_JOB_TECHNICIAN_SUCCESS,
  ADD_JOB_TECHNICIAN_FAIL,
  DELETE_JOB_TECHNICIAN,
  DELETE_JOB_TECHNICIAN_SUCCESS,
  DELETE_JOB_TECHNICIAN_FAIL,
  UPDATE_JOB_TECHNICIAN,
  UPDATE_JOB_TECHNICIAN_SUCCESS,
  UPDATE_JOB_TECHNICIAN_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  jobListUsers: [],
  jobListUser: [],
  technician: [],
  technicians: [],
  // jobUser: [],
  error: {},
  success: false,
  successAdd: false,
  successUpdate: false,
  successDelete: false,
  isLoading: false,
  isLoadingUser: false,
}
const JobListUsersReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_JOBLIST_USER:
      return {
        ...state,
        isLoading: false,
        isLoadingUser: true,
        success: false,
        success_delete: false,
        error: false,
      }
    case FETCH_JOBLIST_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingUser: false,
        // success: true,
        success_delete: false,
        error: false,
        jobListUsers: action.payload,
      }

    case FETCH_JOBLIST_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoadingUser: false,
        success: false,
        success_delete: false,
        error: action.payload,
      }

    case FETCH_JOBLIST_USER_FOR_CALENDAR:
      return {
        ...state,
        isLoading: false,
        isLoadingUser: true,
        success: false,
        success_delete: false,
        error: false,
      }
    case FETCH_JOBLIST_USER_SUCCESS_FOR_CALENDAR:
      return {
        ...state,
        isLoading: false,
        isLoadingUser: false,
        // success: true,
        success_delete: false,
        error: false,
        jobListUser: action.payload,
      }

    case FETCH_JOBLIST_USER_FAIL_FOR_CALENDAR:
      return {
        ...state,
        isLoading: false,
        isLoadingUser: false,
        success: false,
        success_delete: false,
        error: action.payload,
      }

    case FETCH_ALL_TECHNICIANS:
      return {
        ...state,
        isLoading: true,
        success: false,
        success_delete: false,
        error: false,
      }
    case FETCH_ALL_TECHNICIANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // success: true,
        success_delete: false,
        error: false,
        technicians: action.payload,
      }

    case FETCH_ALL_TECHNICIANS_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        success_delete: false,
        error: action.payload,
      }

    case FETCH_TECHNICIAN:
      return {
        ...state,
        isLoading: true,
        success: false,
        success_delete: false,
        error: false,
      }
    case FETCH_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // success: true,
        error: false,
        success_delete: false,
        technician: action.payload,
      }

    case FETCH_TECHNICIAN_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        success_delete: false,
        error: action.payload,
      }

    case ADD_NEW_TECHNICIAN:
      return {
        ...state,
        isLoading: true,
        success: false,
        successAdd: false,
        success_delete: false,
        error: false,
      }

    case ADD_JOB_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        successAdd: true,
        error: false,
        success_delete: false,
        technicians: action.payload,
      }

    case ADD_JOB_TECHNICIAN_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        success_delete: false,
        error: action.payload,
      }

    case UPDATE_JOB_TECHNICIAN:
      return {
        ...state,
        isLoading: true,
        success: false,
        successUpdate: false,
        error: false,
      }

    case UPDATE_JOB_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        successUpdate: true,
        error: false,
        technician: action.payload,
      }

    case UPDATE_JOB_TECHNICIAN_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successUpdate: false,
        error: action.payload,
      }

    case DELETE_JOB_TECHNICIAN:
      return {
        ...state,
        isLoading: true,
        successDelete: false,
        error: false,
      }

    case DELETE_JOB_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successDelete: true,
        error: false,
        technician: action.payload,
      }

    case DELETE_JOB_TECHNICIAN_FAIL:
      return {
        ...state,
        isLoading: false,
        successDelete: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default JobListUsersReducer
