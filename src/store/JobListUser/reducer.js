import {
  FETCH_JOBLIST_USER,
  FETCH_JOBLIST_USER_FAIL,
  FETCH_JOBLIST_USER_SUCCESS,
  FETCH_ALL_TECHNICIANS,
  FETCH_ALL_TECHNICIANS_SUCCESS,
  FETCH_ALL_TECHNICIANS_FAIL,
  FETCH_JOB_USER,
  FETCH_JOB_USER_FAIL,
  FETCH_JOB_USER_SUCCESS,
  ADD_NEW_TECHNICIAN,
  ADD_JOB_TECHNICIAN_SUCCESS,
  ADD_JOB_TECHNICIAN_FAIL,
  DELETE_JOB_USER,
  DELETE_JOB_USER_FAIL,
  DELETE_JOB_USER_SUCCESS,
  UPDATE_JOB_USER,
  UPDATE_JOB_USER_FAIL,
  UPDATE_JOB_USER_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  jobListUsers: [],
  technicians: [],
  // jobUser: [],
  error: {},
  success: false,
  successAdd: false,
  success_delete: false,
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

    // case FETCH_SITE:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     success: false,
    //     success_delete: false,
    //     error: false,
    //   }
    // case FETCH_SITE_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     // success: true,
    //     error: false,
    //     success_delete: false,
    //     site: action.payload,
    //   }

    // case FETCH_SITE_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     success: false,
    //     success_delete: false,
    //     error: action.payload,
    //   }

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

    // case UPDATE_SITE:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     success: false,
    //     success_delete: false,
    //     error: false,
    //   }

    // case UPDATE_SITE_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     success: true,
    //     success_delete: false,
    //     error: false,
    //     sites: action.payload,
    //   }

    // case UPDATE_SITE_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     success: false,
    //     success_delete: false,
    //     error: action.payload,
    //   }

    // case DELETE_SITE:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     success_delete: false,
    //     error: false,
    //   }

    // case DELETE_SITE_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     success_delete: true,
    //     error: false,
    //     sites: action.payload,
    //   }

    // case DELETE_SITE_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     success_delete: false,
    //     error: action.payload,
    //   }

    default:
      return state
  }
}

export default JobListUsersReducer
