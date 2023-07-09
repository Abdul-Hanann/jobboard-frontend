import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_COMPANY,
  FETCH_COMPANY_BY_ID,
  ADD_NEW_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
} from "./actionTypes"
import {
  fetchCompanySuccess,
  fetchCompanyFail,
  fetchCompanyByIdSuccess,
  fetchCompanyByIdFail,
  addCompanySuccess,
  addCompanyFail,
  updateCompanySuccess,
  updateCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "./actions"

import { COMPANY_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"

import {
  getCompany,
  getCompanyById,
  addNewCompany,
  updateCompany,
  deleteCompany,
} from "helpers/backend_helper"

// Fetching All Notifications
// function* fetchAllCompanySaga() {
//   try {
//     const allJobs = yield call(getRequestData, COMPANY_URL)
//     yield put(fetchCompanySuccess(allJobs))
//   } catch (error) {
//     yield put(fetchCompanyFail(error))
//   }
// }

function* fetchAllCompanySaga(action) {
  try {
    const { Company, limit, page } = action
    const allJobs = yield call(getCompany, Company, limit, page)
    yield put(fetchCompanySuccess(allJobs))
  } catch (error) {
    yield put(fetchCompanyFail(error))
  }
}

function* fetchCompanyByIdSaga({ payload: id }) {
  try {
    const response = yield call(getCompanyById, id)
    yield put(fetchCompanyByIdSuccess(response))
  } catch (error) {
    yield put(fetchCompanyByIdFail(error))
  }
}

function* onAddNewCompany({ payload: data }) {
  try {
    const response = yield call(addNewCompany, data)
    yield put(addCompanySuccess(response))
  } catch (error) {
    yield put(addCompanyFail(error))
  }
}

function* onUpdateCompany({ payload: data }) {
  try {
    const response = yield call(updateCompany, data.id, data.data)
    yield put(updateCompanySuccess(response))
  } catch (error) {
    yield put(updateCompanyFail(error))
  }
}
function* onDeleteCompany({ payload: id }) {
  try {
    const response = yield call(deleteCompany, id)
    yield put(deleteCompanySuccess(response))
  } catch (error) {
    yield put(deleteCompanyFail(error))
  }
}

export function* watchFetchAllCompany() {
  yield takeEvery(FETCH_COMPANY, fetchAllCompanySaga)
  yield takeEvery(FETCH_COMPANY_BY_ID, fetchCompanyByIdSaga)
  yield takeEvery(ADD_NEW_COMPANY, onAddNewCompany)
  yield takeEvery(UPDATE_COMPANY, onUpdateCompany)
  yield takeEvery(DELETE_COMPANY, onDeleteCompany)
}

function* AllCompanySaga() {
  yield all([fork(watchFetchAllCompany)])
}

export default AllCompanySaga
