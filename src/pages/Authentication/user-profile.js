import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"
import { userTypeLabels, userTypes } from "./userTypes"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/avatar1.png"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

const UserProfile = () => {
  //meta title
  document.title = "User Profile | SA IT Services"

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [userRole, setUserRole] = useState("")

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  useEffect(() => {
    if (localStorage.getItem("userRole")) {
      const userRoleType = localStorage.getItem("userRole")
      console.log("userRoleType:", userRoleType)
      if (userRoleType === userTypes.ROLE_ADMIN) {
        const userRole = userTypeLabels.ROLE_ADMIN
        console.log("userRole:", userRole)
        setUserRole(userRole)
      } else if (userRoleType === userTypes.ROLE_JOB_CREATOR) {
        const userRole = userTypeLabels.ROLE_JOB_CREATOR
        setUserRole(userRole)
      } else if (userRoleType === userTypes.ROLE_SCHEDULER) {
        const userRole = userTypeLabels.ROLE_SCHEDULER
        setUserRole(userRole)
      } else if (userRoleType === userTypes.ROLE_SITE_ADMIN) {
        const userRole = userTypeLabels.ROLE_SITE_ADMIN
        setUserRole(userRole)
      } else if (userRoleType === userTypes.ROLE_TECHNICIAN) {
        const userRole = userTypeLabels.ROLE_TECHNICIAN
        setUserRole(userRole)
      }
    }
    if (localStorage.getItem("username")) {
      setemail(localStorage.getItem("username"))
    }
    if (localStorage.getItem("name")) {
      setname(localStorage.getItem("name"))
    }
    setTimeout(() => {
      dispatch(resetProfileFlag())
    }, 3000)
  }, [dispatch, localStorage.getItem("username"), localStorage.getItem("name")])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="SA IT Services" breadcrumbItem="User Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mr-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                      {/* <span
                        className="mt-5 mr-5 rounded-circle"
                        style={{
                          marginTop: 50,
                          backgroundColor: "#003768",
                          padding: "15px",
                          textAlign: "center",
                          color: "white",
                          fontStyle: "bold",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {name && (
                          <span
                            className="rounded-circle header-profile-user"
                            style={{
                              backgroundColor: "#003768",
                            }}
                          >
                            {name
                              .replace(/^_+/, "") // Remove leading underscores
                              .split(" ")
                              .map(word => word.charAt(0))
                              .join("")}
                          </span>
                        )}
                      </span> */}
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        {/* <p className="mb-0">Id no: #{idx}</p> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Details</h4>

          <Card>
            <CardBody>
              <Form className="form-horizontal">
                <div className="form-group">
                  <Label className="form-label">User Role</Label>
                  <Input
                    name="userRole"
                    value={userRole}
                    className="form-control"
                    placeholder="Enter User Role"
                    type="text"
                    disabled
                  />

                  <Label className="form-label mt-3"> User Name</Label>
                  <Input
                    name="username"
                    value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    disabled
                  />

                  <Label className="form-label mt-3">User Email</Label>
                  <Input
                    name="username"
                    value={email}
                    className="form-control"
                    placeholder="Enter User Email"
                    type="text"
                    disabled
                  />
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
