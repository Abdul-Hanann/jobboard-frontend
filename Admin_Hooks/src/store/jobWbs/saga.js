import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_JOB_WBS,
  FETCH_JOB_WBS_BY_ID,
  ADD_NEW_JOB_WBS,
  UPDATE_JOB_WBS,
  DELETE_JOB_WBS,
} from "./actionTypes"

import {
  fetchJobWbsSuccess,
  fetchJobWbsFail,
  fetchJobWbsByIdSuccess,
  fetchJobWbsByIdFail,
  addJobWbsSuccess,
  addJobWbsFail,
  updateJobWbsSuccess,
  updateJobWbsFail,
  deleteJobWbsSuccess,
  deleteJobWbsFail,
} from "./actions"

import { JOB_WBS_URL } from "../../helpers/url_helper"
import {
  getJobWbs,
  getJobWbsById,
  addNewJobWbs,
  updateJobWbs,
  deleteJobWbs,
} from "helpers/fakebackend_helper"

import { getRequestData } from "../../helpers/GlobalUtils"

// Fetching All Notifications
function* fetchJobWbsSaga() {
  try {
    const allJobs = yield call(getJobWbs)
    yield put(fetchJobWbsSuccess(allJobs))
  } catch (error) {
    yield put(fetchJobWbsFail(error))
  }
}

function* fetchJobWbsByIdSaga({ payload: id }) {
  try {
    const response = yield call(getJobWbsById, id)
    yield put(fetchJobWbsByIdSuccess(response))
  } catch (error) {
    yield put(fetchJobWbsByIdFail(error))
  }
}

function* onAddNewJobWbs({ payload: data }) {
  try {
    const response = yield call(addNewJobWbs, data)
    yield put(addJobWbsSuccess(response))
  } catch (error) {
    yield put(addJobWbsFail(error))
  }
}

function* onUpdateJobWbs({ payload: data }) {
  try {
    const response = yield call(updateJobWbs, data.id, data.data)
    yield put(updateJobWbsSuccess(response))
  } catch (error) {
    yield put(updateJobWbsFail(error))
  }
}
function* onDeleteJobWbs({ payload: id }) {
  try {
    const response = yield call(deleteJobWbs, id)
    yield put(deleteJobWbsSuccess(response))
  } catch (error) {
    yield put(deleteJobWbsFail(error))
  }
}

export function* watchFetchAllJobWbs() {
  yield takeEvery(FETCH_JOB_WBS, fetchJobWbsSaga)
  yield takeEvery(FETCH_JOB_WBS_BY_ID, fetchJobWbsByIdSaga)
  yield takeEvery(ADD_NEW_JOB_WBS, onAddNewJobWbs)
  yield takeEvery(UPDATE_JOB_WBS, onUpdateJobWbs)
  yield takeEvery(DELETE_JOB_WBS, onDeleteJobWbs)
}

function* AllJobWbsSaga() {
  yield all([fork(watchFetchAllJobWbs)])
}

export default AllJobWbsSaga
