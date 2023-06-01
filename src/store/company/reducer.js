import {
  FETCH_COMPANY,
  FETCH_COMPANY_FAIL,
  FETCH_COMPANY_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  company: [],
  error: {},
  success: false,
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
      }
    case FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        company: action.payload,
      }

    case FETCH_COMPANY_FAIL:
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

export default CompanyReducer
