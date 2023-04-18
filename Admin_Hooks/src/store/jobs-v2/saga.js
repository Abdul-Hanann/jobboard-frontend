import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import { FETCH_JOB_LIST } from "./actionTypes"
import { fetchJobListSuccess, fetchJobListFail } from "./actions"

import { GET_JOB_LIST_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"

// Fetching All Notifications
function* fetchAllJobsSaga() {
  try {
    const allJobs = yield call(getRequestData, GET_JOB_LIST_URL)
    yield put(fetchJobListSuccess(allJobs))
  } catch (error) {
    yield put(fetchJobListFail(error))
  }
}

export function* watchFetchAllJobs() {
  yield takeEvery(FETCH_JOB_LIST, fetchAllJobsSaga)
}

function* AllJobsSaga() {
  yield all([fork(watchFetchAllJobs)])
}

export default AllJobsSaga
