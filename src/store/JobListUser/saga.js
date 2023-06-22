import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_JOBLIST_USER,
  FETCH_ALL_TECHNICIANS,
  FETCH_TECHNICIAN,
  FETCH_JOB_USER,
  ADD_NEW_TECHNICIAN,
  UPDATE_JOB_TECHNICIAN,
  UPDATE_JOB_USER,
  DELETE_JOB_TECHNICIAN,
} from "./actionTypes"
import {
  fetchJobListUsersSuccess,
  // fetchSiteSuccess,
  fetchJobListUsersFail,
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
  getAllTechnicians,
  addNewJobTechnician,
  deleteJobTechnician,
  getTechnician,
  updateJobTechnician,
  getSitesFilter,
} from "helpers/fakebackend_helper"
import {
  addNewJobUser,
  updateSite,
  deleteSite,
} from "helpers/fakebackend_helper"

// Fetching All Notifications
// function* fetchAllJobsSaga() {
//   try {
//     const allJobs = yield call(getRequestData, GET_JOB_LIST_URL)
//     yield put(fetchJobListSuccess(allJobs))
//   } catch (error) {
//     yield put(fetchJobListFail(error))
//   }
// }
// function* fetchAllSitesSaga() {
//   try {
//     // const {
//     //   siteId,
//     //   building,
//     //   city,
//     //   state,
//     //   zipCode,
//     //   timeZone,
//     //   JobWbs,
//     //   company,
//     //   limit,
//     //   page,
//     // } = action
//     const allJobListUsers = yield call(
//       getSites,
//       // siteId,
//       // building,
//       // city,
//       // state,
//       // zipCode,
//       // timeZone,
//       // JobWbs,
//       // company,
//       // limit,
//       // page
//     )
//     yield put(fetchJobListUsersSuccess(allJobListUsers))
//   } catch (error) {
//     yield put(fetchJobListUsersFail(error))
//   }
// }

function* fetchAllJobListUsersSaga(action) {
  try {
    console.log("=======================================================")
    const { id, date, location, zipCode, accessToken } = action
    const allJobListUsers = yield call(
      getJobListUsers,
      id,
      date,
      location,
      zipCode,
      accessToken
    )
    yield put(fetchJobListUsersSuccess(allJobListUsers))
  } catch (error) {
    yield put(fetchJobListUsersFail(error))
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
    console.log("data:", data)
    console.log("data status:", data.status)
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
  // yield takeEvery(FETCH_SITES, fetchAllSitesSaga)
  yield takeEvery(FETCH_JOBLIST_USER, fetchAllJobListUsersSaga)
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
