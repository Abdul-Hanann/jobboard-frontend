import React from "react";
import { Navigate } from "react-router-dom";

const Authmiddleware = (props) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  console.log("isAuthenticated:", isAuthenticated)

  const userType = localStorage.getItem("userType")
  console.log("userType:", userType)

  // if (!isAuthenticated) {
  //   return (
  //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  //   );
  // } else if (isAuthenticated && !userType) {
  //   return (
  //     "You have logged in  successfully please contact to admin to get your role",
  //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  //   );
  // } else {
  //   return (
  //     <Navigate to={{ pathname: "/dashboard" }} />
  //   );
  // }
  return (<React.Fragment>
    {props.children}
  </React.Fragment>);
};

export default Authmiddleware;
