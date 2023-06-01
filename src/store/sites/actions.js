import {
  FETCH_SITES,
  FETCH_SITES_BY_PARAMS,
  FETCH_SITES_FAIL,
  FETCH_SITE_SUCCESS,
  FETCH_SITE,
  FETCH_SITE_FAIL,
  FETCH_SITES_SUCCESS,
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

export const fetchSites = (
  siteId,
  building,
  city,
  state,
  zipCode,
  timeZone,
  JobWbs,
  company
) => ({
  type: FETCH_SITES,
  siteId,
  building,
  city,
  state,
  zipCode,
  timeZone,
  JobWbs,
  company,
})

export const fetchSitesFilter = data => ({
  type: FETCH_SITES_BY_PARAMS,
  payload: data,
})

export const fetchSitesSuccess = sites => ({
  type: FETCH_SITES_SUCCESS,
  payload: sites,
})

export const fetchSitesFail = error => ({
  type: FETCH_SITES_FAIL,
  payload: error,
})

export const fetchSite = id => ({
  type: FETCH_SITE,
  payload: id,
})

export const fetchSiteSuccess = site => ({
  type: FETCH_SITE_SUCCESS,
  payload: site,
})

export const fetchSiteFail = error => ({
  type: FETCH_SITE_FAIL,
  payload: error,
})

export const addNewSite = data => ({
  type: ADD_NEW_SITE,
  payload: data,
})

export const addSiteSuccess = site => ({
  type: ADD_SITE_SUCCESS,
  payload: site,
})

export const addSiteFail = error => ({
  type: ADD_SITE_FAIL,
  payload: error,
})

export const updateSite = data => ({
  type: UPDATE_SITE,
  payload: data,
})

export const updateSiteSuccess = site => ({
  type: UPDATE_SITE_SUCCESS,
  payload: site,
})

export const updateSiteFail = error => ({
  type: UPDATE_SITE_FAIL,
  payload: error,
})

export const deleteSite = data => ({
  type: DELETE_SITE,
  payload: data,
})

export const deleteSiteSuccess = site => ({
  type: DELETE_SITE_SUCCESS,
  payload: site,
})

export const deleteSiteFail = error => ({
  type: DELETE_SITE_FAIL,
  payload: error,
})
