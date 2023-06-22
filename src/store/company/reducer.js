import {
  FETCH_COMPANY,
  FETCH_COMPANY_FAIL,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_BY_ID,
  FETCH_COMPANY_FAIL_BY_ID,
  FETCH_COMPANY_SUCCESS_BY_ID,
  ADD_NEW_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  company: [],
  error: false,
  errorBody: {},
  success: false,
  successAdd: false,
  errorAdd: false,
  successUpdate: false,
  errorUpdate: false,
  successDelete: false,
  errorDelete: false,
  isLoading: false,
}
const CompanyReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPANY:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
        errorAdd: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
      }
    case FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        successDelete: false,
        errorUpdate: false,
        error: false,
        errorAdd: false,
        errorDelete: false,
        company: action.payload,
      }

    case FETCH_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        errorAdd: false,
        successDelete: false,
        errorUpdate: false,
        errorDelete: false,
        error: true,
        errorBody: action.payload,
      }

    case FETCH_COMPANY_BY_ID:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        errorAdd: false,
        success: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }
    case FETCH_COMPANY_SUCCESS_BY_ID:
      return {
        ...state,
        isLoading: false,
        success: true,
        successAdd: false,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: false,
        error: false,
        successDelete: false,
        errorDelete: false,
        company: action.payload,
      }

    case FETCH_COMPANY_FAIL_BY_ID:
      return {
        ...state,
        isLoading: false,
        success: false,
        errorAdd: false,
        successAdd: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: true,
        errorBody: action.payload,
      }

    case ADD_NEW_COMPANY:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // success: true,
        successAdd: true,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
        company: action.payload,
      }

    case ADD_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        errorAdd: true,
        successAdd: false,
        successUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: true,
        errorBody: action.payload,
      }

    case UPDATE_COMPANY:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        success: false,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successUpdate: true,
        errorUpdate: false,
        successAdd: false,
        errorAdd: false,
        error: false,
        successDelete: false,
        errorDelete: false,
        company: action.payload,
      }

    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: true,
        successDelete: false,
        errorDelete: false,
        error: true,
        errorBody: action.payload,
      }

    case DELETE_COMPANY:
      return {
        ...state,
        isLoading: true,
        successAdd: false,
        errorAdd: false,
        success: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: false,
        error: false,
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: true,
        errorDelete: false,
        error: false,
        company: action.payload,
      }

    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        successAdd: false,
        errorAdd: false,
        successUpdate: false,
        errorUpdate: false,
        successDelete: false,
        errorDelete: true,
        error: true,
        errorBody: action.payload,
      }

    default:
      return state
  }
}

export default CompanyReducer
