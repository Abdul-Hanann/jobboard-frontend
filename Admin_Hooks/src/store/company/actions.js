import {
  FETCH_COMPANY,
  FETCH_COMPANY_FAIL,
  FETCH_COMPANY_SUCCESS,
} from "./actionTypes"

export const fetchCompany = () => ({
  type: FETCH_COMPANY,
})

export const fetchCompanySuccess = jobs => ({
  type: FETCH_COMPANY_SUCCESS,
  payload: jobs,
})

export const fetchCompanyFail = error => ({
  type: FETCH_COMPANY_FAIL,
  payload: error,
})
