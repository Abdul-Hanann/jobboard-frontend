import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import { FETCH_JOB_WBS } from "./actionTypes"
import { fetchJobWbsSuccess, fetchJobWbsFail } from "./actions"

import { JOB_WBS_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"

// Fetching All Notifications
function* fetchAllJobWbsSaga() {
  try {
    const allJobs = yield call(getRequestData, JOB_WBS_URL)
    yield put(fetchJobWbsSuccess(allJobs))
  } catch (error) {
    yield put(fetchJobWbsFail(error))
  }
}

export function* watchFetchAllJobWbs() {
  yield takeEvery(FETCH_JOB_WBS, fetchAllJobWbsSaga)
}

function* AllJobWbsSaga() {
  yield all([fork(watchFetchAllJobWbs)])
}

export default AllJobWbsSaga
