import { all, fork } from "redux-saga/effects"

//public
import authSaga_v2 from "./auth-v2/login/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import dashboardJobSaga from "./dashboard-jobs/saga"
import AllJobsSaga from "./jobs-v2/saga"
import AllSitesSaga from "./sites/saga"
import AllJobWbsSaga from "./jobWbs/saga"
import AllCompanySaga from "./company/saga"
import AllJobListUsersSaga from "./JobListUser/saga"
export default function* rootSaga() {
  yield all([
    //public
    fork(authSaga_v2),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(dashboardJobSaga),
    fork(AllJobsSaga),
    fork(AllSitesSaga),
    fork(AllJobWbsSaga),
    fork(AllCompanySaga),
    fork(AllJobListUsersSaga),
  ])
}
