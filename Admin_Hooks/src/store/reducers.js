import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
// import Login from "./auth/login/reducer"
import loginV2 from "./auth-v2/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//jobs
// import JobReducer from "./jobs/reducer"

//sotes
import SitesReducer from "./sites/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer"

//Dasboard crypto
import DashboardCrypto from "./dashboard-crypto/reducer"

//Dasboard blog
import DashboardBlog from "./dashboard-blog/reducer"

//Dasboard job
import DashboardJob from "./dashboard-jobs/reducer"
import JobListReducer from "./jobs-v2/reducer"
import JobWbsReducer from "./jobWbs/reducer"

import CompanyReducer from "./company/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  // Login,
  loginV2,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  // JobReducer,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
  DashboardCrypto,
  DashboardBlog,
  DashboardJob,
  JobListReducer,
  SitesReducer,
  JobWbsReducer,
  CompanyReducer,
})

export default rootReducer
