import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { layoutTypes } from "./constants/layout"
// Import Routes all
import {
  authProtectedRoutes,
  publicRoutes,
  adminRoutes,
  siteAdminRoutes,
  jobCreatorRoutes,
  technicianRoutes,
  schedulerRoutes,
} from "./routes"

import { userTypeLabels } from "pages/Authentication/userTypes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend"
import Dashboard from "pages/Dashboard"
import Login from "pages/Authentication/Login"

// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

// const getLayout = (layoutType) => {
//   let Layout = HorizontalLayout;
//   switch (layoutType) {
//     case layoutTypes.VERTICAL:
//       Layout = VerticalLayout;
//       break;
//     case layoutTypes.HORIZONTAL:
//       Layout = HorizontalLayout;
//       break;
//     default:
//       break;
//   }
//   return Layout;
// };

const App = () => {
  const getCookies = () => {
    const cookies = document.cookie.split(";")
    const cookieData = {}

    cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split("=")
      cookieData[name] = decodeURIComponent(value)
    })

    return cookieData
  }

  const cookies = getCookies()

  localStorage.setItem("userType", cookies.userRole)

  localStorage.setItem("isAuthenticated", cookies.isAuthenticated)
  // useEffect(() => {
  //   if (cookies && cookies.userRole) {
  //     console.log("cookies:", cookies)
  //     localStorage.setItem("userType", cookies.userRole)
  //   }
  //   if (cookies && cookies.isAuthenticated) {
  //     localStorage.setItem("isAuthenticated", cookies.isAuthenticated)
  //   }
  // }, [cookies])

  const isAuthenticated = localStorage.getItem("isAuthenticated")
  console.log("isAuthenticated App:", isAuthenticated)



  const userType = localStorage.getItem("userType")
  console.log("userType App:", userType)

  const Layout = HorizontalLayout

  return (
    <React.Fragment>
      {console.log("authProtectedRoutes")}



      <Routes>

        {
          isAuthenticated === undefined ? (
            <>
              <Route path="/*" element={<Authmiddleware />} />

              {publicRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                  key={idx}
                  exact={true}
                />
              ))}
            </>

          ) : (
            <Route path="/*" element={<Dashboard />} />

          )
        }


        {
          isAuthenticated ? (
            <>
              {authProtectedRoutes.map((route, idx) => (
                < Route
                  path={route.path}
                  element={
                    < Authmiddleware >
                      <Layout>{route.component}</Layout>
                    </Authmiddleware>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
            </>

          ) : (
            <Route path="/*" element={<Login />} />

          )
        }

        {userType === userTypeLabels.ROLE_ADMIN &&
          adminRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}

        {userType === userTypeLabels.ROLE_SITE_ADMIN &&
          siteAdminRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
        {userType === userTypeLabels.ROLE_JOB_CREATOR &&
          jobCreatorRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
        {userType === userTypeLabels.ROLE_TECHNICIAN &&
          technicianRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
        {userType === userTypeLabels.ROLE_SCHEDULER &&
          schedulerRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
      </Routes>
    </React.Fragment >
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
