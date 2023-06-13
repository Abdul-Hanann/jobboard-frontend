import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import Login from "pages/Authentication/Login"
import { userTypes } from "pages/Authentication/userTypes"
import "react-tooltip/dist/react-tooltip.css"
// Import Routes all
import {
  authProtectedRoutes,
  publicRoutes,
  adminRoutes,
  siteAdminRoutes,
  jobCreatorRoutes,
  technicianRoutes,
  schedulerRoutes,
  noRoleRoutes,
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
// fakeBackend()

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

  localStorage.setItem("isAuthenticated", cookies.isAuthenticated)
  localStorage.setItem("userId", cookies.uniqueId)
  if (cookies.userRole) {
    if (cookies.userRole !== "undefined") {
      localStorage.setItem("userRole", cookies.userRole)
    } else {
      localStorage.setItem("userRole", "undefinedd")
    }
  } else {
    localStorage.setItem("userRole", "undefinedd")
  }

  if (cookies.accessToken) {
    localStorage.setItem("accessToken", cookies.accessToken)
  }

  let isAuthenticated = localStorage.getItem("isAuthenticated")

  const userRole = localStorage.getItem("userRole")

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
          userRole === userTypes.ROLE_TECHNICIAN ||
          userRole === "undefinedd") ? (
          <>
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
            {userRole === "undefinedd" &&
              noRoleRoutes.map((route, idx) => (
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
