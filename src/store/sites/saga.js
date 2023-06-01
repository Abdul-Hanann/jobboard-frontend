import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Redux States
import {
  FETCH_SITES,
  FETCH_SITES_BY_PARAMS,
  FETCH_SITE,
  ADD_NEW_SITE,
  UPDATE_SITE,
  DELETE_SITE,
} from "./actionTypes"
import {
  fetchSitesSuccess,
  fetchSiteSuccess,
  fetchSitesFail,
  fetchSiteFail,
  addSiteSuccess,
  addSiteFail,
  updateSiteSuccess,
  updateSiteFail,
  deleteSiteSuccess,
  deleteSiteFail,
} from "./actions"
import { getSites, getSite, getSitesFilter } from "helpers/fakebackend_helper"

import { GET_JOB_LIST_URL } from "../../helpers/url_helper"
import { getRequestData } from "../../helpers/GlobalUtils"
import { addNewSite, updateSite, deleteSite } from "helpers/fakebackend_helper"

// Fetching All Notifications
// function* fetchAllJobsSaga() {
//   try {
//     const allJobs = yield call(getRequestData, GET_JOB_LIST_URL)
//     yield put(fetchJobListSuccess(allJobs))
//   } catch (error) {
//     yield put(fetchJobListFail(error))
//   }
// }
function* fetchAllSitesSaga(action) {
  try {
    const {
      siteId,
      building,
      city,
      state,
      zipCode,
      timeZone,
      JobWbs,
      company,
      limit,
      page,
    } = action
    const allSites = yield call(
      getSites,
      siteId,
      building,
      city,
      state,
      zipCode,
      timeZone,
      JobWbs,
      company,
      limit,
      page
    )
    yield put(fetchSitesSuccess(allSites))
  } catch (error) {
    yield put(fetchSitesFail(error))
  }
}

function* fetchAllSiteSaga({ payload: id }) {
  try {
    const Site = yield call(getSite, id)
    yield put(fetchSiteSuccess(Site))
  } catch (error) {
    yield put(fetchSiteFail(error))
  }
}

function* onAddNewSite({ payload: data }) {
  try {
    const response = yield call(addNewSite, data)
    yield put(addSiteSuccess(response))
  } catch (error) {
    yield put(addSiteFail(error))
  }
}

function* onUpdateSite({ payload: data }) {
  try {
    const response = yield call(updateSite, data.id, data.data)
    yield put(updateSiteSuccess(response))
  } catch (error) {
    yield put(updateSiteFail(error))
  }
}
function* onDeleteSite({ payload: siteId }) {
  try {
    const response = yield call(deleteSite, siteId)
    yield put(deleteSiteSuccess(response))
  } catch (error) {
    yield put(deleteSiteFail(error))
  }
}

export function* watchFetchAllSites() {
  yield takeEvery(FETCH_SITES, fetchAllSitesSaga)
  yield takeEvery(FETCH_SITE, fetchAllSiteSaga)
  yield takeEvery(ADD_NEW_SITE, onAddNewSite)
  yield takeEvery(UPDATE_SITE, onUpdateSite)
  yield takeEvery(DELETE_SITE, onDeleteSite)
}

function* AllSitesSaga() {
  yield all([fork(watchFetchAllSites)])
}

export default AllSitesSaga
