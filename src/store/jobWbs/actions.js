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

export const fetchJobWbs = JobWbs => ({
  type: FETCH_JOB_WBS,
  JobWbs,
})

export const fetchJobWbsSuccess = jobWbs => ({
  type: FETCH_JOB_WBS_SUCCESS,
  payload: jobWbs,
})

export const fetchJobWbsFail = error => ({
  type: FETCH_JOB_WBS_FAIL,
  payload: error,
})
export const fetchJobWbsById = id => ({
  type: FETCH_JOB_WBS_BY_ID,
  payload: id,
})

export const fetchJobWbsByIdSuccess = jobWbs => ({
  type: FETCH_JOB_WBS_SUCCESS_BY_ID,
  payload: jobWbs,
})

export const fetchJobWbsByIdFail = error => ({
  type: FETCH_JOB_WBS_FAIL_BY_ID,
  payload: error,
})

export const addNewJobWbs = data => ({
  type: ADD_NEW_JOB_WBS,
  payload: data,
})

export const addJobWbsSuccess = jobWbs => ({
  type: ADD_JOB_WBS_SUCCESS,
  payload: jobWbs,
})

export const addJobWbsFail = error => ({
  type: ADD_JOB_WBS_FAIL,
  payload: error,
})

export const updateJobWbs = data => ({
  type: UPDATE_JOB_WBS,
  payload: data,
})

export const updateJobWbsSuccess = jobWbs => ({
  type: UPDATE_JOB_WBS_SUCCESS,
  payload: jobWbs,
})

export const updateJobWbsFail = error => ({
  type: UPDATE_JOB_WBS_FAIL,
  payload: error,
})

export const deleteJobWbs = data => ({
  type: DELETE_JOB_WBS,
  payload: data,
})

export const deleteJobWbsSuccess = jobWbs => ({
  type: DELETE_JOB_WBS_SUCCESS,
  payload: jobWbs,
})

export const deleteJobWbsFail = error => ({
  type: DELETE_JOB_WBS_FAIL,
  payload: error,
})
