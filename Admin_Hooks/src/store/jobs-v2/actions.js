import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_FAIL,
  FETCH_JOB_LIST_SUCCESS,
  ADD_NEW_JOB,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
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
