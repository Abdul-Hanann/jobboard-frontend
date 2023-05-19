import PropTypes from "prop-types"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "pages/Authentication/Login"
import { userTypes } from "pages/Authentication/userTypes"
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

// Import all middleware
import Authmiddleware from "./routes/route"
import { Middleware } from "routes/middleware"

// layouts Format
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
fakeBackend()

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

  localStorage.setItem("userRole", cookies.userRole)

  localStorage.setItem("isAuthenticated", cookies.isAuthenticated)
  // localStorage.setItem("isAuthenticated", true)

  let isAuthenticated = localStorage.getItem("isAuthenticated")
  console.log("isAuthenticated App:", isAuthenticated)

  const userRole = localStorage.getItem("userRole")
  console.log("userRole App:", userRole)

  const Layout = HorizontalLayout

  return (
    <React.Fragment>
      <Routes>
        <Route path="/*" element={<Middleware />} />
        {isAuthenticated === "true" &&
        (userRole === userTypes.ROLE_ADMIN ||
          userRole === userTypes.ROLE_SITE_ADMIN ||
          userRole === userTypes.ROLE_JOB_CREATOR ||
          userRole === userTypes.ROLE_SCHEDULER ||
          userRole === userTypes.ROLE_TECHNICIAN) ? (
          <>
            {console.log("in isAuthenticated ")}
            {/* {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  // <Authmiddleware>
                  <Layout>{route.component}</Layout>
                  // </Authmiddleware>
                }
                key={idx}
                exact={true}
              />
            ))} */}

            {userRole === userTypes.ROLE_ADMIN &&
              adminRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    // <Authmiddleware>
                    <Layout>{route.component}</Layout>
                    // </Authmiddleware>
                  }
                  key={idx}
                  exact={true}
                />
              ))}

            {userRole === userTypes.ROLE_SITE_ADMIN &&
              siteAdminRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    // <Authmiddleware>
                    <Layout>{route.component}</Layout>
                    // </Authmiddleware>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
            {userRole === userTypes.ROLE_JOB_CREATOR &&
              jobCreatorRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    // <Authmiddleware>
                    <Layout>{route.component}</Layout>
                    // </Authmiddleware>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
            {userRole === userTypes.ROLE_TECHNICIAN &&
              technicianRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    // <Authmiddleware>
                    <Layout>{route.component}</Layout>
                    // </Authmiddleware>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
            {userRole === userTypes.ROLE_SCHEDULER &&
              schedulerRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    // <Authmiddleware>
                    <Layout>{route.component}</Layout>
                    // </Authmiddleware>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
          </>
        ) : (
          <>
            {console.log("in else isAuthenticated")}
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </>
        )}
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
