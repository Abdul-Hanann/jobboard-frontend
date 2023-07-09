import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import loginV2 from "./auth-v2/login/reducer"

//Calendar
import calendar from "./calendar/reducer"

//sotes
import SitesReducer from "./sites/reducer"

//Dasboard job
import DashboardJob from "./dashboard-jobs/reducer"
import JobListReducer from "./jobs-v2/reducer"
import JobWbsReducer from "./jobWbs/reducer"

import CompanyReducer from "./company/reducer"

import JobListUsersReducer from "./JobListUser/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  // Login,
  loginV2,
  calendar,
  DashboardJob,
  JobListReducer,
  SitesReducer,
  JobWbsReducer,
  CompanyReducer,
  JobListUsersReducer,
})

export default rootReducer
