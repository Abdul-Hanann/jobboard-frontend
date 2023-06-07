import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_JOBLIST_USER,
  FETCH_ALL_TECHNICIANS,
  FETCH_JOB_USER,
  ADD_NEW_TECHNICIAN,
  UPDATE_JOB_USER,
  DELETE_JOB_USER,
} from "./actionTypes"
import {
  fetchJobListUsersSuccess,
  // fetchSiteSuccess,
  fetchJobListUsersFail,
  fetchAllTechniciansSuccess,
  fetchAllTechniciansFail,
  // fetchSiteFail,
  addJobTechnicianSuccess,
  addJobTechnicianFail,
  // updateSiteSuccess,
  // updateSiteFail,
  // deleteSiteSuccess,
  // deleteSiteFail,
} from "./actions"
import {
  getJobListUsers,
  getAllTechnicians,
  addNewJobTechnician,
  getSite,
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

function* fetchAllJobListUsersSaga({ payload: id }) {
  try {
    const allJobListUsers = yield call(getJobListUsers, id)
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

function* onAddNewJobTechnician({ payload: data }) {
  try {
    const response = yield call(addNewJobTechnician, data)
    yield put(addJobTechnicianSuccess(response))
  } catch (error) {
    yield put(addJobTechnicianFail(error))
  }
}

// function* onUpdateSite({ payload: data }) {
//   try {
//     const response = yield call(updateSite, data.id, data.data)
//     yield put(updateSiteSuccess(response))
//   } catch (error) {
//     yield put(updateSiteFail(error))
//   }
// }
// function* onDeleteSite({ payload: siteId }) {
//   try {
//     const response = yield call(deleteSite, siteId)
//     yield put(deleteSiteSuccess(response))
//   } catch (error) {
//     yield put(deleteSiteFail(error))
//   }
// }

export function* watchFetchAllJobListUsers() {
  // yield takeEvery(FETCH_SITES, fetchAllSitesSaga)
  yield takeEvery(FETCH_JOBLIST_USER, fetchAllJobListUsersSaga)
  yield takeEvery(FETCH_ALL_TECHNICIANS, fetchAllTechniciansSaga)
  yield takeEvery(ADD_NEW_TECHNICIAN, onAddNewJobTechnician)
  // yield takeEvery(UPDATE_SITE, onUpdateSite)
  // yield takeEvery(DELETE_SITE, onDeleteSite)
}

function* AllJobListUsersSaga() {
  yield all([fork(watchFetchAllJobListUsers)])
}

export default AllJobListUsersSaga
