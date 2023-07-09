import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_JOB_LIST,
  ADD_NEW_JOB,
  UPDATE_JOB_LIST,
  DELETE_JOB_LIST,
} from "./actionTypes"
import {
  fetchJobListSuccess,
  fetchJobListFail,
  addJobSuccess,
  addJobFail,
  updateJobSuccess,
  updateJobFail,
  deleteJobSuccess,
  deleteJobFail,
} from "./actions"
import { GET_JOB_LIST_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"
import {
  getJobList,
  addNewJobList,
  updateJobList,
  deleteJobList,
} from "helpers/backend_helper"

function* fetchJobList(action) {
  try {
    const {
      JobName,
      JobNoOfDays,
      JobWbs,
      JobSiteId,
      filteredStartDate,
      limit,
      page,
    } = action
    const allJobs = yield call(
      getJobList,
      JobName,
      JobNoOfDays,
      JobWbs,
      JobSiteId,
      filteredStartDate,
      limit,
      page
    )
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
function* onUpdateJobList({ payload: data }) {
  try {
    const response = yield call(updateJobList, data.id, data.data)
    yield put(updateJobSuccess(response))
  } catch (error) {
    yield put(updateJobFail(error))
  }
}
function* onDeleteJobList({ payload: id }) {
  try {
    const response = yield call(deleteJobList, id)
    yield put(deleteJobSuccess(response))
  } catch (error) {
    yield put(deleteJobFail(error))
  }
}

export function* watchFetchAllJobs() {
  yield takeEvery(FETCH_JOB_LIST, fetchJobList)
  yield takeEvery(ADD_NEW_JOB, onAddNewJobList)
  yield takeEvery(UPDATE_JOB_LIST, onUpdateJobList)
  yield takeEvery(DELETE_JOB_LIST, onDeleteJobList)
}

function* AllJobsSaga() {
  yield all([fork(watchFetchAllJobs)])
}

export default AllJobsSaga
