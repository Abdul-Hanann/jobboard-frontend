import {
  FETCH_JOB_WBS,
  FETCH_JOB_WBS_FAIL,
  FETCH_JOB_WBS_SUCCESS,
} from "./actionTypes"

export const fetchJobWbs = () => ({
  type: FETCH_JOB_WBS,
})

export const fetchJobWbsSuccess = jobs => ({
  type: FETCH_JOB_WBS_SUCCESS,
  payload: jobs,
})

export const fetchJobWbsFail = error => ({
  type: FETCH_JOB_WBS_FAIL,
  payload: error,
})
