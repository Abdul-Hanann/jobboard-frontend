import {
  FETCH_SITES,
  FETCH_SITES_FAIL,
  FETCH_SITES_SUCCESS,
  FETCH_SITE,
  FETCH_SITE_FAIL,
  FETCH_SITE_SUCCESS,
  ADD_NEW_SITE,
  ADD_SITE_SUCCESS,
  ADD_SITE_FAIL,
  DELETE_SITE,
  DELETE_SITE_FAIL,
  DELETE_SITE_SUCCESS,
  UPDATE_SITE,
  UPDATE_SITE_FAIL,
  UPDATE_SITE_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  sites: [],
  site: [],
  error: {},
  success: false,
  isLoading: false,
}
const SitesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_SITES:
      console.log("FETCH_SITESSSSSSSSSSSS")
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }
    case FETCH_SITES_SUCCESS:
      console.log("FETCH_SITES_SUCCESS")
      return {
        ...state,
        isLoading: false,
        // success: true,
        error: false,
        sites: action.payload,
      }

    case FETCH_SITES_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      }

    case FETCH_SITE:
      console.log("FETCH_SITE")
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }
    case FETCH_SITE_SUCCESS:
      console.log("FETCH_SITE_SUCCESS")
      return {
        ...state,
        isLoading: false,
        // success: true,
        error: false,
        site: action.payload,
      }

    case FETCH_SITE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      }

    case ADD_NEW_SITE:
      console.log("ADD_NEW_SITE")
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }

    case ADD_SITE_SUCCESS:
      console.log("ADD_SITE_SUCCESS")
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        site: action.payload,
      }

    case ADD_SITE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      }

    case UPDATE_SITE:
      console.log("UPDATE_SITE")
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }

    case UPDATE_SITE_SUCCESS:
      console.log("UPDATE_SITE_SUCCESS")
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        sites: action.payload,
      }

    case UPDATE_SITE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      }

    case DELETE_SITE:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
      }

    case DELETE_SITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        sites: action.payload,
      }

    case DELETE_SITE_FAIL:
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

export default SitesReducer
