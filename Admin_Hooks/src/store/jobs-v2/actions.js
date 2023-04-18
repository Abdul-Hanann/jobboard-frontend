import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_FAIL,
  FETCH_JOB_LIST_SUCCESS,
} from "./actionTypes"

export const fetchJobList = () => ({
  type: FETCH_JOB_LIST,
})

export const fetchJobListSuccess = jobs => ({
  type: FETCH_JOB_LIST_SUCCESS,
  payload: jobs,
})

export const fetchJobListFail = error => ({
  type: FETCH_JOB_LIST_FAIL,
  payload: error,
})
