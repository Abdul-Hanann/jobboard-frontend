import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_JOBLIST_USER,
  ETCH_JOBLIST_USER_FOR_CALENDAR,
  FETCH_ALL_TECHNICIANS,
  FETCH_TECHNICIAN,
  FETCH_JOB_USER,
  ADD_NEW_TECHNICIAN,
  UPDATE_JOB_TECHNICIAN,
  UPDATE_JOB_USER,
  DELETE_JOB_TECHNICIAN,
  FETCH_JOBLIST_USER_FOR_CALENDAR,
} from "./actionTypes"
import {
  fetchJobListUsersSuccess,
  // fetchSiteSuccess,
  fetchJobListUsersFail,
  fetchJobListUserForCalendarSuccess,
  fetchJobListUserForCalendarFail,
  fetchAllTechniciansSuccess,
  fetchAllTechniciansFail,
  fetchTechnicianSuccess,
  fetchTechnicianFail,
  addJobTechnicianSuccess,
  addJobTechnicianFail,
  updateJobTechnicianSuccess,
  updateJobTechnicianFail,
  // updateSiteSuccess,
  // updateSiteFail,
  deleteJobTechnicianSuccess,
  deleteJobTechnicianFail,
} from "./actions"
import {
  getJobListUsers,
  getJobListUserForCalendar,
  getAllTechnicians,
  addNewJobTechnician,
  deleteJobTechnician,
  getTechnician,
  updateJobTechnician,
  getSitesFilter,
} from "helpers/backend_helper"

function* fetchAllJobListUsersSaga(action) {
  try {
    const { id, accessToken } = action
    const allJobListUsers = yield call(getJobListUsers, id, accessToken)
    yield put(fetchJobListUsersSuccess(allJobListUsers))
  } catch (error) {
    yield put(fetchJobListUsersFail(error))
  }
}

function* fetchAllJobListUserForCalendarSaga(action) {
  try {
    const { id, startDate, endDate, maxDistance, zipcode, accessToken } = action
    const allJobListUsers = yield call(
      getJobListUserForCalendar,
      id,
      startDate,
      endDate,
      maxDistance,
      zipcode,
      accessToken
    )
    yield put(fetchJobListUserForCalendarSuccess(allJobListUsers))
  } catch (error) {
    yield put(fetchJobListUserForCalendarFail(error))
  }
}

function* fetchAllTechniciansSaga() {
  try {
    const technicians = yield call(getAllTechnicians)
    yield put(fetchAllTechniciansSuccess(technicians))
  } catch (error) {
    yield put(fetchAllTechniciansFail(error))
  }
}

function* fetchTechnicianSaga({ payload: id }) {
  try {
    const technician = yield call(getTechnician, id)
    yield put(fetchTechnicianSuccess(technician))
  } catch (error) {
    yield put(fetchTechnicianFail(error))
  }
}

function* onAddNewJobTechnician({ payload: data }) {
  try {
    const response = yield call(addNewJobTechnician, data)
    yield put(addJobTechnicianSuccess(response))
  } catch (error) {
    yield put(addJobTechnicianFail(error))
  }
}

function* onUpdateJobTechnician({ payload: data }) {
  try {
    const response = yield call(updateJobTechnician, data.id, data)
    yield put(updateJobTechnicianSuccess(response))
  } catch (error) {
    yield put(updateJobTechnicianFail(error))
  }
}
function* onDeleteJobTechnician({ payload: id }) {
  try {
    const response = yield call(deleteJobTechnician, id)
    yield put(deleteJobTechnicianSuccess(response))
  } catch (error) {
    yield put(deleteJobTechnicianFail(error))
  }
}

export function* watchFetchAllJobListUsers() {
  yield takeEvery(FETCH_JOBLIST_USER, fetchAllJobListUsersSaga)
  yield takeEvery(
    FETCH_JOBLIST_USER_FOR_CALENDAR,
    fetchAllJobListUserForCalendarSaga
  )
  yield takeEvery(FETCH_ALL_TECHNICIANS, fetchAllTechniciansSaga)
  yield takeEvery(FETCH_TECHNICIAN, fetchTechnicianSaga)
  yield takeEvery(ADD_NEW_TECHNICIAN, onAddNewJobTechnician)
  yield takeEvery(UPDATE_JOB_TECHNICIAN, onUpdateJobTechnician)
  yield takeEvery(DELETE_JOB_TECHNICIAN, onDeleteJobTechnician)
}

function* AllJobListUsersSaga() {
  yield all([fork(watchFetchAllJobListUsers)])
}

export default AllJobListUsersSaga
