import React from "react"

import { FC } from "react"

import { Navigate } from "react-router"

// import { useAppSelector } from "./store/hooks"

// import { RoutesPath } from "./utils/constants/common"

export const Middleware: FC = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  console.log("isAuthenticated:", isAuthenticated)

  const userRole = localStorage.getItem("userRole")
  console.log("userRole:", userRole)

  if (isAuthenticated === "true") {
    return <Navigate to={{ pathname: "/dashboard" }} />
  } else {
    return <Navigate to={{ pathname: "/login" }} />
  }
}
