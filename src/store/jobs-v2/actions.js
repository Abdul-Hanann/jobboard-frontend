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

// export const fetchJobList = () => ({
//   type: FETCH_JOB_LIST,

// })
export const fetchJobList = (
  JobName,
  JobNoOfDays,
  JobWbs,
  JobSiteId,
  filteredStartDate,
  limit
) => ({
  type: FETCH_JOB_LIST,
  JobName,
  JobNoOfDays,
  JobWbs,
  JobSiteId,
  filteredStartDate,
  limit,
})

export const fetchJobListSuccess = jobs => ({
  type: FETCH_JOB_LIST_SUCCESS,
  payload: jobs,
})

export const fetchJobListFail = error => ({
  type: FETCH_JOB_LIST_FAIL,
  payload: error,
})

export const addNewJob = data => ({
  type: ADD_NEW_JOB,
  payload: data,
})

export const addJobSuccess = job => ({
  type: ADD_JOB_SUCCESS,
  payload: job,
})

export const addJobFail = error => ({
  type: ADD_JOB_FAIL,
  payload: error,
})

// export const updateJob = data => ({
//   type: UPDATE_JOB_LIST,
//   payload: data,
// })
export const updateJob = data => ({
  type: UPDATE_JOB_LIST,
  payload: data,
})

export const updateJobSuccess = job => ({
  type: UPDATE_JOB_LIST_SUCCESS,
  payload: job,
})

export const updateJobFail = error => ({
  type: UPDATE_JOB_LIST_FAIL,
  payload: error,
})

export const deleteJob = data => ({
  type: DELETE_JOB_LIST,
  payload: data,
})

export const deleteJobSuccess = job => ({
  type: DELETE_JOB_LIST_SUCCESS,
  payload: job,
})

export const deleteJobFail = error => ({
  type: DELETE_JOB_LIST_FAIL,
  payload: error,
})
