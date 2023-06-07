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

export const fetchJobListUsers = id => ({
  type: FETCH_JOBLIST_USER,
  payload: id,
})

export const fetchJobListUsersSuccess = jobListUsers => ({
  type: FETCH_JOBLIST_USER_SUCCESS,
  payload: jobListUsers,
})

export const fetchJobListUsersFail = error => ({
  type: FETCH_JOBLIST_USER_FAIL,
  payload: error,
})

export const fetchAllTechnicians = () => ({
  type: FETCH_ALL_TECHNICIANS,
})

export const fetchAllTechniciansSuccess = technicians => ({
  type: FETCH_ALL_TECHNICIANS_SUCCESS,
  payload: technicians,
})

export const fetchAllTechniciansFail = error => ({
  type: FETCH_ALL_TECHNICIANS_FAIL,
  payload: error,
})

// export const fetchSite = id => ({
//   type: FETCH_SITE,
//   payload: id,
// })

// export const fetchSiteSuccess = site => ({
//   type: FETCH_SITE_SUCCESS,
//   payload: site,
// })

// export const fetchSiteFail = error => ({
//   type: FETCH_SITE_FAIL,
//   payload: error,
// })

export const addNewJobTechnician = data => ({
  type: ADD_NEW_TECHNICIAN,
  payload: data,
})

export const addJobTechnicianSuccess = data => ({
  type: ADD_JOB_TECHNICIAN_SUCCESS,
  payload: data,
})

export const addJobTechnicianFail = error => ({
  type: ADD_JOB_TECHNICIAN_FAIL,
  payload: error,
})

// export const updateSite = data => ({
//   type: UPDATE_SITE,
//   payload: data,
// })

// export const updateSiteSuccess = site => ({
//   type: UPDATE_SITE_SUCCESS,
//   payload: site,
// })

// export const updateSiteFail = error => ({
//   type: UPDATE_SITE_FAIL,
//   payload: error,
// })

// export const deleteSite = data => ({
//   type: DELETE_SITE,
//   payload: data,
// })

// export const deleteSiteSuccess = site => ({
//   type: DELETE_SITE_SUCCESS,
//   payload: site,
// })

// export const deleteSiteFail = error => ({
//   type: DELETE_SITE_FAIL,
//   payload: error,
// })
