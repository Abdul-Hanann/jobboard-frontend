import { data } from "common/data/jobWbsData"
import {
  FETCH_JOBLIST_USER,
  FETCH_JOBLIST_USER_FAIL,
  FETCH_JOBLIST_USER_SUCCESS,
  FETCH_ALL_TECHNICIANS,
  FETCH_ALL_TECHNICIANS_SUCCESS,
  FETCH_ALL_TECHNICIANS_FAIL,
  FETCH_TECHNICIAN,
  FETCH_TECHNICIAN_FAIL,
  FETCH_TECHNICIAN_SUCCESS,
  FETCH_JOB_USER,
  FETCH_JOB_USER_FAIL,
  FETCH_JOB_USER_SUCCESS,
  ADD_NEW_TECHNICIAN,
  ADD_JOB_TECHNICIAN_SUCCESS,
  ADD_JOB_TECHNICIAN_FAIL,
  DELETE_JOB_TECHNICIAN,
  DELETE_JOB_TECHNICIAN_FAIL,
  DELETE_JOB_TECHNICIAN_SUCCESS,
  UPDATE_JOB_TECHNICIAN,
  UPDATE_JOB_TECHNICIAN_SUCCESS,
  UPDATE_JOB_TECHNICIAN_FAIL,
} from "./actionTypes"

export const fetchJobListUsers = (
  id,
  date,
  location,
  zipCode,
  accessToken
) => ({
  type: FETCH_JOBLIST_USER,
  id,
  date,
  location,
  zipCode,
  accessToken,
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

export const fetchTechnician = id => ({
  type: FETCH_TECHNICIAN,
  payload: id,
})

export const fetchTechnicianSuccess = site => ({
  type: FETCH_TECHNICIAN_SUCCESS,
  payload: site,
})

export const fetchTechnicianFail = error => ({
  type: FETCH_TECHNICIAN_FAIL,
  payload: error,
})

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

export const updateJobTechnician = data => ({
  type: UPDATE_JOB_TECHNICIAN,
  payload: data,
})

export const updateJobTechnicianSuccess = data => ({
  type: UPDATE_JOB_TECHNICIAN_SUCCESS,
  payload: data,
})

export const updateJobTechnicianFail = error => ({
  type: UPDATE_JOB_TECHNICIAN_FAIL,
  payload: error,
})

export const deleteJobTechnician = data => ({
  type: DELETE_JOB_TECHNICIAN,
  payload: data,
})

export const deleteJobTechnicianSuccess = technician => ({
  type: DELETE_JOB_TECHNICIAN_SUCCESS,
  payload: technician,
})

export const deleteJobTechnicianFail = error => ({
  type: DELETE_JOB_TECHNICIAN_FAIL,
  payload: error,
})
