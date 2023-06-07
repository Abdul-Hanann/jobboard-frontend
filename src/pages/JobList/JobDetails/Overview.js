import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import * as Yup from "yup"
// import Select from "react-select"
// import TextField from "@material-ui/core/TextField"
// import Autocomplete from "@material-ui/lab/Autocomplete"
// import Select from "@material-ui/core/Select"
import { useFormik } from "formik"
import { userTypes } from "pages/Authentication/userTypes"

//redux
import { useSelector, useDispatch } from "react-redux"
import * as moment from "moment"
//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../../assets/images/users/avatar-5.jpg"
import avatar1 from "../../../assets/images/users/avatar-1.jpg"
import avatar2 from "../../../assets/images/users/avatar-2.jpg"
import avatar6 from "../../../assets/images/users/avatar-6.jpg"
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
// import avatar7 from "../../../assets"
import Select from "react-select"
import {
  fetchJobListUsers,
  fetchAllTechnicians,
  addNewJobTechnician,
} from "store/actions"

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  Button,
} from "reactstrap"
//import images
import adobephotoshop from "../../../assets/images/companies/adobe-photoshop.svg"

const Overview = ({ jobList }) => {
  const userType = localStorage.getItem("userType")
  const [modal, setModal] = useState(false)
  const [dataField, setDataField] = useState(null)

  const [jobListId, setJobListId] = useState(null)
  const [jobDay, setJobDay] = useState(null)
  const [selectedGroup, setselectedGroup] = useState(null)
  const [selectedTechniciansOption, setSelectedtechniciansOption] =
    useState(null)
  const [jobWbs, setJobWbs] = useState(null)
  // Inside your component
  const [userData, setUserData] = useState([])
  const [techniciansData, setTechniciansData] = useState([])

  const userRoleType = localStorage.getItem("userRole")
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    setUserRole(userRoleType)
  }, [userRoleType])

  const { jobListUsers, technicians, isLoadingUser, successAdd } = useSelector(
    state => state.JobListUsersReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setJobListId(jobList.id)
  }, [jobList])

  useEffect(() => {
    if (jobListId) {
      console.log("getting jobsList users")
      dispatch(fetchJobListUsers(jobListId))
    }
  }, [dispatch, jobListId])

  useEffect(() => {
    if (successAdd) {
      dispatch(fetchJobListUsers(jobListId))
    }
  }, [dispatch, jobListId, successAdd])

  useEffect(() => {
    if (jobListUsers && jobListUsers.length > 0) {
      const userDataArray = jobListUsers.map(item => ({
        jobId: item.jobId,
        jobDay: item.jobDay,
        userData: item.userData,
      }))
      setUserData(userDataArray)
    } else {
      // Handle the case when jobListUsers is empty
      setUserData([])
    }
  }, [jobListUsers])

  useEffect(() => {
    if (technicians) {
      setTechniciansData(technicians)
    }
  }, [technicians])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setDataField(null)
    } else {
      setModal(true)
      setDataField(jobList)
    }
  }

  const handleSelectTechniciansChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedtechniciansOption({ label: selectedLabel, value: selectedValue })
    if (selectedValue !== "" || selectedValue !== undefined) {
      document.getElementById("techniciansError").style.display = "none"
    }
  }

  const handleClick = (jobList, jobDay) => {
    setJobDay(jobDay)
    dispatch(fetchAllTechnicians())
    toggle()
  }

  const handleAssignClick = () => {
    selectedTechniciansOption?.value === "" ||
    selectedTechniciansOption?.value === undefined ||
    selectedTechniciansOption?.value === "undefined"
      ? (document.getElementById("techniciansError").style.display = "block")
      : (document.getElementById("techniciansError").style.display = "none")
    let isApproved = userRole === userTypes.ROLE_ADMIN ? true : false
    if (selectedTechniciansOption?.value !== "") {
      let data = {
        userId: selectedTechniciansOption?.value,
        jobId: jobListId,
        jobDay: jobDay,
        isApproved: isApproved,
      }
      console.log("Adding tech to Day")
      dispatch(addNewJobTechnician(data))
      toggle()
    } else {
      console.log("Check fields")
    }
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} className="overflow-visible">
        <ModalHeader toggle={toggle} tag="h4">
          Assign Technician
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg="12">
                <div className="mb-3">
                  <Label>Job Day</Label>
                  <Input
                    id="JobName"
                    name="JobName"
                    type="text"
                    className="form-control"
                    placeholder="Enter Job Name..."
                    value={jobDay}
                    readOnly
                  />
                </div>
              </Col>
              <Col lg="12">
                <div className="mb-3">
                  <Label>Technician</Label>
                  <Input
                    name="Technician"
                    type="select"
                    className="form-select"
                    placeholder="Insert Technician"
                    onChange={handleSelectTechniciansChange}
                    value={selectedTechniciansOption?.value}
                  >
                    <option value="" disabled selected>
                      Select Technician
                    </option>
                    {Array.isArray(techniciansData) &&
                    techniciansData.length > 0 ? (
                      techniciansData.map((technician, index) => (
                        <option key={index} value={technician?.id}>
                          {technician.displayName}
                        </option>
                      ))
                    ) : (
                      <option value="">No technicians available</option>
                    )}
                  </Input>
                </div>
              </Col>
              <div
                style={{
                  color: "red",
                  display: "none",
                }}
                id={"techniciansError"}
              >
                Please Enter Technician
              </div>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <Button
                    // type="submit"
                    className="btn btn-success save-user"
                    onClick={handleAssignClick}
                  >
                    Assign
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Col xl={3}>
        <Card>
          <CardBody>
            <h5 className="fw-semibold">Overview</h5>

            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="col">Job Name</th>
                    <td
                      scope="col"
                      className="d-flex justify-content-center text-align-center"
                    >
                      {jobList.jobName}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Job Date:</th>
                    <td className="d-flex justify-content-center text-align-center">
                      {handleValidDate(jobList.jobDate)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Job No Of Days:</th>
                    <td className="d-flex justify-content-center text-align-center">
                      {jobList.numberOfDays}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Job Site Id</th>
                    <td className="d-flex justify-content-center text-align-center">
                      {jobList.site?.siteId}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <CardBody> */}
            <h4 className="card-title mb-2">Assignees</h4>
            <div className="table-responsive">
              <table className="table table-nowrap align-middle mb-0">
                <tbody>
                  {isLoadingUser ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {/* <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> */}
                        <div className="text-center my-3">
                          <i className="bx bx-loader bx-spin font-size-18 align-middle text-success me-2" />
                          Loading...
                        </div>
                      </td>
                    </tr>
                  ) : (
                    [...Array(jobList.numberOfDays)].map((_, index) => {
                      const dayData = userData.find(
                        data => data.jobDay === index + 1
                      )

                      return (
                        <tr key={index}>
                          <td></td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0">
                              Day {index + 1}
                            </h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              {dayData && dayData.userData.length > 0 ? (
                                <>
                                  {dayData.userData.map((user, userIndex) => {
                                    let initials = ""
                                    if (user.name) {
                                      const nameWithoutUnderscore =
                                        user.name.replace(/^_+/, "") // Remove leading underscores
                                      initials = nameWithoutUnderscore
                                        .split(" ")
                                        .map(word => word.charAt(0))
                                        .join("")
                                    }

                                    return (
                                      <div
                                        className="avatar-group"
                                        key={userIndex}
                                      >
                                        <div className="avatar-group-item">
                                          <div className="avatar-xs">
                                            <span
                                              className="avatar-title rounded-circle bg-success text-white font-size-16"
                                              style={{ padding: "19px" }}
                                              data-tooltip-id={`tooltip-${userIndex}`}
                                              data-tooltip-content={user.name}
                                            >
                                              {initials}
                                            </span>
                                          </div>
                                        </div>
                                        <Tooltip
                                          effect="solid"
                                          id={`tooltip-${userIndex}`}
                                        />
                                      </div>
                                    )
                                  })}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleClick(jobList, dayData.jobDay)
                                    }}
                                    className="btn btn-success btn-rounded ms-2"
                                  >
                                    <i className="fas fa-plus align-middle"></i>
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleClick(jobList)
                                  }}
                                  className="btn btn-success btn-rounded ms-2"
                                >
                                  <i className="fas fa-plus align-middle"></i>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}

                  {/* ///////////////////////////////////////////////// */}
                  {/* <tr>
                    <td style={{ width: "40px" }}></td>
                    <td>
                      <h5 className="text-truncate font-size-14 m-0">Day 1</h5>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <div className="avatar-group-item">
                          <img
                            src={avatar4}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                        </div>
                        <div className="avatar-group-item">
                          <img
                            src={avatar5}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleClick(jobList)
                          }}
                          className="btn btn-success btn-rounded ms-2"
                        >
                          <i className="fas fa-plus align-middle"></i>
                        </button>
                      </div>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td></td>
                    <td>
                      <h5 className="text-truncate font-size-14 m-0">Day 2</h5>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <div className="avatar-group-item">
                          <img
                            src={avatar1}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                        </div>
                        <div className="avatar-group-item">
                          <img
                            src={avatar2}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                        </div>
                        <div className="avatar-group-item">
                          <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-success text-white font-size-16">
                              A
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="badge rounded-pill badge-soft-primary font-size-11">
                          Approved
                        </span>
                      </div>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td></td>
                    <td>
                      <h5 className="text-truncate font-size-14 m-0">
                        Day 3
                      </h5>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <button
                          onClick={() => {
                            handleClick(jobList)
                          }}
                          type="button"
                          className="btn btn-success btn-rounded ms-2"
                        >
                          <i className="fas fa-plus align-middle"></i>
                        </button>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
            {/* </CardBody> */}

            {userType === userTypes.ROLE_TECHNICIAN && (
              <div className="hstack gap-2">
                <button className="btn btn-soft-success w-100">
                  Apply Now
                </button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* <Card>
          <CardBody>
            <div className="text-center">
              <img
                src={adobephotoshop}
                alt=""
                height="50"
                className="mx-auto d-block"
              />
              <h5 className="mt-3 mb-1">Themesbrand</h5>
              <p className="text-muted mb-0">Since July 2017</p>
            </div>

            <ul className="list-unstyled mt-4">
              <li>
                <div className="d-flex">
                  <i className="bx bx-phone text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Phone</h6>
                    <p className="text-muted fs-14 mb-0">+589 560 56555</p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="bx bx-mail-send text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Email</h6>
                    <p className="text-muted fs-14 mb-0">
                      themesbrand@gmail.com
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="bx bx-globe text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Website</h6>
                    <p className="text-muted fs-14 text-break mb-0">
                      www.themesbrand.com
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="bx bx-map text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted fs-14 mb-0">
                      Oakridge Lane Richardson.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                to="#"
                className="btn btn-soft-primary btn-hover w-100 rounded"
              >
                <i className="mdi mdi-eye"></i> View Profile
              </Link>
            </div>
          </CardBody>
        </Card> */}
      </Col>
    </React.Fragment>
  )
}

export default Overview
