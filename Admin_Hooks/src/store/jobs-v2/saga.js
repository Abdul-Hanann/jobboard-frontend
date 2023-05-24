import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import { FETCH_JOB_LIST, ADD_NEW_JOB } from "./actionTypes"
import {
  fetchJobListSuccess,
  fetchJobListFail,
  addJobSuccess,
  addJobFail,
} from "./actions"
import getApplyJob, { getJobList } from "helpers/fakebackend_helper"

import { GET_JOB_LIST_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"
import { addNewJobList } from "helpers/fakebackend_helper"

// Fetching All Notifications
// function* fetchAllJobsSaga() {
//   try {
//     const allJobs = yield call(getRequestData, GET_JOB_LIST_URL)
//     yield put(fetchJobListSuccess(allJobs))
//   } catch (error) {
//     yield put(fetchJobListFail(error))
//   }
// }
function* fetchJobList() {
  try {
    const allJobs = yield call(getJobList)
    yield put(fetchJobListSuccess(allJobs))
  } catch (error) {
    yield put(fetchJobListFail(error))
  }
}
function* onAddNewJobList({ payload: data }) {
  try {
    const response = yield call(addNewJobList, data)
    yield put(addJobSuccess(response))
  } catch (error) {
    yield put(addJobFail(error))
  }
}

export function* watchFetchAllJobs() {
  yield takeEvery(FETCH_JOB_LIST, fetchJobList)
  yield takeEvery(ADD_NEW_JOB, onAddNewJobList)
}

function* AllJobsSaga() {
  yield all([fork(watchFetchAllJobs)])
}

export default AllJobsSaga
