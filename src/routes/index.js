import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import UserRoleNotAssigned from "pages/Authentication/UserRoleNotAssigned"

// Dashboard
import Dashboard from "../pages/DashboardJob/index"

import Company from "pages/Company"
import CreateCompany from "pages/Company/CreateCompany"

//Job
import JobList from "../pages/JobList"
import JobCreate from "../pages/JobList/JobsCreate"
import JobDetails from "pages/JobList/JobDetails"
// import jobListView from "pages/JobList/jobListView"
import AddJob from "../pages/AddJob"
import JobWbs from "pages/JobWbs"
import JobWbsCreate from "pages/JobWbs/CreateJobWbs"
import JobWbsView from "pages/JobWbs/ViewJobWbs"
import SiteAdmin from "../pages/SiteAdmin/index"
import SiteAdminCreate from "../pages/SiteAdmin/SiteAdminCreate"
import Schedule from "pages/Schedule"
const adminRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/joblist", component: <JobList /> },
  { path: "/joblist/jobcreate", component: <JobCreate /> },
  { path: "/joblist/editJob", component: <JobCreate /> },
  { path: "/joblist/jobDetails", component: <JobDetails /> },
  { path: "/jobwbs", component: <JobWbs /> },
  { path: "/jobWbs/create", component: <JobWbsCreate /> },
  { path: "/jobWbs/edit", component: <JobWbsCreate /> },
  { path: "/jobWbs/view", component: <JobWbsView /> },
  { path: "/schedule", component: <Schedule /> },
  { path: "/addjob", component: <AddJob /> },
  { path: "/siteadmin", component: <SiteAdmin /> },
  { path: "/siteadmin/create", component: <SiteAdminCreate /> },
  { path: "/siteadmin/edit", component: <SiteAdminCreate /> },
  { path: "/company", component: <Company /> },
  { path: "/company/create", component: <CreateCompany /> },
  { path: "/company/edit", component: <CreateCompany /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]
const siteAdminRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/joblist", component: <JobList /> },
  { path: "/joblist/jobcreate", component: <JobCreate /> },
  { path: "/joblist/editJob", component: <JobCreate /> },
  { path: "/joblist/jobDetails", component: <JobDetails /> },
  { path: "/siteadmin", component: <SiteAdmin /> },
  { path: "/siteadmin/create", component: <SiteAdminCreate /> },
  { path: "/siteadmin/edit", component: <SiteAdminCreate /> },
  { path: "/schedule", component: <Schedule /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]
const jobCreatorRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/joblist", component: <JobList /> },
  { path: "/joblist/jobcreate", component: <JobCreate /> },
  { path: "/joblist/editJob", component: <JobCreate /> },
  { path: "/joblist/jobDetails", component: <JobDetails /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]
const technicianRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/joblist", component: <JobList /> },
  { path: "/joblist/jobcreate", component: <JobCreate /> },
  { path: "/joblist/editJob", component: <JobCreate /> },
  { path: "/joblist/jobDetails", component: <JobDetails /> },
  { path: "/schedule", component: <Schedule /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]
const schedulerRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/joblist", component: <JobList /> },
  { path: "/joblist/jobcreate", component: <JobCreate /> },
  { path: "/joblist/editJob", component: <JobCreate /> },
  { path: "/joblist/jobDetails", component: <JobDetails /> },
  { path: "/schedule", component: <Schedule /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]
const noRoleRoutes = [
  { path: "/user-role-not-assigned", component: <UserRoleNotAssigned /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/user-role-not-assigned" />,
  },
]

const publicRoutes = [
  // { path: "/user-role-not-assigned", component: <UserRoleNotAssigned /> },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  // { path: "/forgot-password", component: <ForgetPwd /> },
  // { path: "/register", component: <Register /> },

  // { path: "/pages-maintenance", component: <PagesMaintenance /> },
  // { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  // { path: "/pages-404", component: <Pages404 /> },
  // { path: "/pages-500", component: <Pages500 /> },
  // { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  // // Authentication Inner
  // { path: "/pages-login", component: <Login1 /> },
  // { path: "/pages-login-2", component: <Login2 /> },
  // { path: "/pages-register", component: <Register1 /> },
  // { path: "/pages-register-2", component: <Register2 /> },
  // { path: "/page-recoverpw", component: <Recoverpw /> },
  // { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  // { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  // { path: "/auth-recoverpw-2", component: <ForgetPwd2 /> },
  // { path: "/auth-lock-screen", component: <LockScreen /> },
  // { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  // { path: "/page-confirm-mail", component: <ConfirmMail /> },
  // { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  // { path: "/auth-email-verification", component: <EmailVerification /> },
  // { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  // { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  // {
  //   path: "/auth-two-step-verification-2",
  //   component: <TwostepVerification2 />,
  // },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
]

export {
  publicRoutes,
  adminRoutes,
  siteAdminRoutes,
  jobCreatorRoutes,
  technicianRoutes,
  schedulerRoutes,
  noRoleRoutes,
}
