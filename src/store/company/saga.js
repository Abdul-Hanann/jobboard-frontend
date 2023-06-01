import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import { FETCH_COMPANY } from "./actionTypes"
import { fetchCompanySuccess, fetchCompanyFail } from "./actions"

import { COMPANY_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"

// Fetching All Notifications
function* fetchAllCompanySaga() {
  try {
    const allJobs = yield call(getRequestData, COMPANY_URL)
    yield put(fetchCompanySuccess(allJobs))
  } catch (error) {
    yield put(fetchCompanyFail(error))
  }
}

export function* watchFetchAllCompany() {
  yield takeEvery(FETCH_COMPANY, fetchAllCompanySaga)
}

function* AllCompanySaga() {
  yield all([fork(watchFetchAllCompany)])
}

export default AllCompanySaga
