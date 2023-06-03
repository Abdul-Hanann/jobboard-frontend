import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  url: "",
  error: "",
  isUserLogout: false,
  loading: false,
}

const loginV2 = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        isUserLogout: false,
        url: action.payload,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true }
      break
    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        isUserLogout: false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default loginV2