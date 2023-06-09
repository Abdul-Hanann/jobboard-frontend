import React from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"
import { userTypeLabels } from "../Authentication/userTypes"

const WelcomeComp = () => {
  const userType = localStorage.getItem("userType")

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
  ]
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>SAIT Job Board Dashboard</p>
                <p>Discription goes here...</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col xl="2" sm="2">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">Henry Price</h5>
              {/* {(userType === "ROLE_ADMIN") && (
              <p className="text-muted mb-0 text-truncate">Admin</p>)}
              {(userType === "ROLE_JOB_CREATOR") && (
              <p className="text-muted mb-0 text-truncate">Job Creator</p>)}
              {(userType === "ROLE_TECHNICIAN") && (
              <p className="text-muted mb-0 text-truncate">Technician</p>)}
              {(userType === "ROLE_SCHEDULER") && (
              <p className="text-muted mb-0 text-truncate">Scheduler</p>)} */}
              <p className="text-muted mb-0 text-truncate">
                {userTypeLabels[userType]}
              </p>
            </Col>
            <Col className="pt-2 mt-5">
              <Link
                to=""
                className="btn btn-primary  btn-sm"
                style={{
                  backgroundColor: "green",
                  borderRadius: "30px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  padding: "15px 30px",
                  fontSize: "18px",
                }}
              >
                View Profile <i className="mdi mdi-arrow-right ms-1"></i>
              </Link>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
