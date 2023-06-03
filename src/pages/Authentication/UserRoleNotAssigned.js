import React, { useEffect } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col, Row, Button } from "reactstrap"

// import saitlogo from "assets/images/SA-IT-Services-Hero-Image.webp"
import { useNavigate } from "react-router-dom"
import { GET_LOGOUT } from "helpers/url_helper"

import saitlogo from "assets/images/SA-IT-Services-Hero-Image-removebg-preview.png"
import { socialLogin } from "store/actions"
const UserRoleNotAssigned = () => {
  const history = useNavigate()

  const handlerFunc = () => {
    localStorage.removeItem("isAuthenticated")

    console.log("loging out")
    window.open(GET_LOGOUT, "_blank")
    history("/login")
    window.location.reload()
  }

  return (
    <React.Fragment>
      {/* <div
        // className="bsk-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Your Sign in request was successful but currently no role is Assigned
          to you.
          <br /> Please contact your Admin for role assignment.
        </h1>
        <button
          className="bsk-btn bsk-btn-default"
          style={{
            padding: "20px",
            borderRadius: "30px",
            backgroundColor: "green",
            color: "white",
            fontSize: 16,
            marginTop: "20px",
          }}
          onClick={handlerFunc}
        >
          <object
            type="image/svg+xml"
            data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
            className="x-icon"
          ></object>
          Sign out with Microsoft
        </button>
      </div>
    </React.Fragment>
  )
}
export default UserRoleNotAssigned
