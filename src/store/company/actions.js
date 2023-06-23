import {
  FETCH_COMPANY,
  FETCH_COMPANY_FAIL,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_BY_ID,
  FETCH_COMPANY_FAIL_BY_ID,
  FETCH_COMPANY_SUCCESS_BY_ID,
  ADD_NEW_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "./actionTypes"

export const fetchCompany = (Company, limit, page) => ({
  type: FETCH_COMPANY,
  Company,
  limit,
  page,
})

export const fetchCompanySuccess = Company => ({
  type: FETCH_COMPANY_SUCCESS,
  payload: Company,
})

export const fetchCompanyFail = error => ({
  type: FETCH_COMPANY_FAIL,
  payload: error,
})

export const fetchCompanyById = id => ({
  type: FETCH_COMPANY_BY_ID,
  payload: id,
})

export const fetchCompanyByIdSuccess = Company => ({
  type: FETCH_COMPANY_SUCCESS_BY_ID,
  payload: Company,
})

export const fetchCompanyByIdFail = error => ({
  type: FETCH_COMPANY_FAIL_BY_ID,
  payload: error,
})

export const addNewCompany = data => ({
  type: ADD_NEW_COMPANY,
  payload: data,
})

export const addCompanySuccess = Company => ({
  type: ADD_COMPANY_SUCCESS,
  payload: Company,
})

export const addCompanyFail = error => ({
  type: ADD_COMPANY_FAIL,
  payload: error,
})

export const updateCompany = data => ({
  type: UPDATE_COMPANY,
  payload: data,
})

export const updateCompanySuccess = Company => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: Company,
})

export const updateCompanyFail = error => ({
  type: UPDATE_COMPANY_FAIL,
  payload: error,
})

export const deleteCompany = data => ({
  type: DELETE_COMPANY,
  payload: data,
})

export const deleteCompanySuccess = Company => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: Company,
})

export const deleteCompanyFail = error => ({
  type: DELETE_COMPANY_FAIL,
  payload: error,
})
