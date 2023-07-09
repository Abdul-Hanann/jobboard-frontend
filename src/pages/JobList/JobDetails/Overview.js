import React, { useEffect, useState } from "react"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { userTypes } from "pages/Authentication/userTypes"
import DeleteModal from "components/Common/DeleteModalCustom"
import AddModal from "components/Common/AddModalCustom"

//redux
import { useSelector, useDispatch } from "react-redux"
import * as moment from "moment"
import {
  fetchJobListUsers,
  fetchAllTechnicians,
  addNewJobTechnician,
  updateJobTechnician,
  deleteJobTechnician,
} from "store/actions"

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Card,
  CardBody,
  Button,
} from "reactstrap"

const Overview = ({ jobList }) => {
  const userType = localStorage.getItem("userType")
  const [modal, setModal] = useState(false)
  const [userinfo, setUserinfo] = useState(null)
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [technicianId, setTechnicianId] = useState(false)
  const [dataField, setDataField] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  const [jobListId, setJobListId] = useState(null)
  const [jobDay, setJobDay] = useState(null)
  const [selectedTechniciansOption, setSelectedtechniciansOption] =
    useState(null)
  const [selectedStatusOption, setSelectedStatusOption] = useState(null)
  // Inside your component
  const [userData, setUserData] = useState([])
  const [techniciansData, setTechniciansData] = useState([])
  const [technicianData, setTechnicianData] = useState(null)

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [dayIndex, setDayIndex] = useState(null)

  const [addressLine, setAddressLine] = useState("")
  const [latitude, setLatitude] = useState(null)
  const [longitute, setLongitute] = useState(null)

  const tokenId = localStorage.getItem("userId")
  // const tokenId = "8cd171d0-929d-4632-866e-2ec210b0858d"
  const [userId, setUserId] = useState(null)

  const userRoleType = localStorage.getItem("userRole")
  const [userRole, setUserRole] = useState(null)

  const statusOptions = [
    {
      label: "Approve",
      value: "approved",
    },
    { label: "Pending", value: "pending" },
    { label: "Decline", value: "declined" },
  ]
  useEffect(() => {
    if (userRoleType) {
      setUserRole(userRoleType)
    }
    if (tokenId) {
      setUserId(tokenId)
    }
  }, [userRoleType, tokenId])

  const {
    jobListUsers,
    technicians,
    technician,
    isLoadingUser,
    successAdd,
    successUpdate,
    successDelete,
  } = useSelector(state => state.JobListUsersReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    setJobListId(jobList.id)
    console.log("jobList:", jobList)
    setAddressLine(jobList?.site?.addressLine1)
    setLatitude(parseFloat(jobList?.site?.latitude))
    setLongitute(parseFloat(jobList?.site?.longitute))
  }, [jobList])

  let token = localStorage.getItem("accessToken")

  useEffect(() => {
    if (token) {
      setAccessToken(token)
    }
    // }
  }, [token])

  useEffect(() => {
    if (latitude && longitute) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitute },
        zoom: 15,
      })
      // lat: latValue, lng: lngValue
      // Add a marker to the map at the specified location
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitute },
        map,
        title: addressLine,
      })

      // Add a click event listener to the marker
      marker.addListener("click", () => {
        // Open Google Maps in a new tab with the specified address
        const mapsUrl = `https://www.google.com/maps?q=${addressLine}`
        window.open(mapsUrl, "_blank")
      })
    }
  }, [latitude, longitute])

  useEffect(() => {
    if (jobListId && accessToken) {
      console.log("getting jobsList users")
      dispatch(fetchJobListUsers(jobListId, accessToken))
    }
    // }
  }, [dispatch, jobListId, accessToken])

  useEffect(() => {
    if (jobListId && accessToken) {
      if (successAdd || successDelete || successUpdate) {
        dispatch(fetchJobListUsers(jobListId, accessToken))
      }
      // if (successDelete) {
      //   dispatch(fetchJobListUsers(jobListId))
    }
  }, [
    dispatch,
    jobListId,
    accessToken,
    successAdd,
    successUpdate,
    successDelete,
  ])

  useEffect(() => {
    if (jobListUsers && jobListUsers.length > 0) {
      console.log("jobListUsers:", jobListUsers)
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
  useEffect(() => {
    if (technician) {
      setTechnicianData(technician)
    }
  }, [technician])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setDataField(null)
    } else {
      setModal(true)
      setDataField(jobList)
      if (jobListId && accessToken) {
        console.log("getting jobsList users")
        dispatch(fetchJobListUsers(jobListId, accessToken))
      }
    }
  }

  const updateToggle = () => {
    if (updateModal) {
      setUpdateModal(false)
      if (jobListId && accessToken) {
        console.log("getting jobsList users")
        dispatch(fetchJobListUsers(jobListId, accessToken))
      }
    } else {
      setUpdateModal(true)
    }
  }

  const handleSelectStatusChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedStatusOption({ label: selectedLabel, value: selectedValue })
    if (selectedValue !== "" || selectedValue !== undefined) {
      document.getElementById("statusError").style.display = "none"
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

  const handleApplyClick = (jobList, jobDays) => {
    setJobDay(jobDays)
    setAddModal(true)
  }

  const handleClick = (jobList, jobDay) => {
    setJobDay(jobDay)
    dispatch(fetchAllTechnicians())
    toggle()
  }

  const handleUpdatSpanClick = user => {
    setUserinfo(user)
    const status = user.status
    let label = ""
    if (status === "approved") {
      label = "Approved"
    } else if (status === "pending") {
      label = "Pending"
    } else if (status === "decline") {
      label = "Decline"
    }
    setSelectedStatusOption({ label: label, value: user.status })
    updateToggle()
  }

  const validateSubmit = () => {
    let valid = false // Initialize valid as false
    let status = ""

    if (userRole === userTypes.ROLE_TECHNICIAN) {
      valid = true
      status = "pending"
    } else {
      if (
        selectedTechniciansOption?.value === "" ||
        selectedTechniciansOption?.value === undefined ||
        selectedTechniciansOption?.value === "undefined"
      ) {
        document.getElementById("techniciansError").style.display = "block"
        valid = false // Set valid as false if validation fails
        status = "pending"
      } else {
        document.getElementById("techniciansError").style.display = "none"
        valid = true // Set valid as true if validation passes
        status = "approved"
      }
    }

    return [valid, status]
  }

  const handleAssignClick = () => {
    const [validated, status] = validateSubmit()
    if (validated) {
      let data = {
        userId:
          userRole === userTypes.ROLE_TECHNICIAN
            ? userId
            : selectedTechniciansOption?.value,
        jobId: jobListId,
        jobDay: jobDay,
        status: status,
      }
      dispatch(addNewJobTechnician(data))
      if (userRole === userTypes.ROLE_TECHNICIAN) {
        setAddModal(false)
      } else {
        toggle()
      }
    } else {
      console.log("Check fields")
    }
  }

  const handleUpdateClick = () => {
    // let id = userinfo.id
    let data = {
      id: userinfo.id,
      status: selectedStatusOption?.value,
    }
    dispatch(updateJobTechnician(data))

    updateToggle()
    // }
  }

  const onClickDelete = id => {
    setTechnicianId(id)
    setDeleteModal(true)
  }

  const handleMouseEnter = (day_Index, userIndex) => {
    setHoveredIndex(userIndex)
    setDayIndex(day_Index)
    // Additional logic or actions when mouse enters
  }

  const handleMouseLeave = userIndex => {
    setHoveredIndex(null)
    setDayIndex(null)
    // Additional logic or actions when mouse leaves
  }
  // Function to handle user deletion
  const handleDeleteUser = () => {
    if (technicianId) {
      dispatch(deleteJobTechnician(technicianId))
      setDeleteModal(false)
    }
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  return (
    <React.Fragment>
      <AddModal
        show={addModal}
        jobDay={jobDay}
        onAddClick={handleAssignClick}
        onCloseClick={() => setAddModal(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Modal
        isOpen={updateModal}
        toggle={updateToggle}
        className="overflow-visible"
      >
        <ModalHeader toggle={updateToggle} tag="h4">
          Update Status
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg="12">
                <div className="mb-3">
                  <Label>User name</Label>
                  <Input
                    id="UserName"
                    name="UserName"
                    type="text"
                    className="form-control"
                    placeholder="Enter Job Name..."
                    value={userinfo?.name}
                    readOnly
                  />
                </div>
              </Col>
              <Col lg="12">
                <div className="mb-3">
                  <Label>Status</Label>
                  <Input
                    name="Technician"
                    type="select"
                    className="form-select"
                    placeholder="Insert Status"
                    onChange={handleSelectStatusChange}
                    value={selectedStatusOption?.value}
                  >
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status?.value}>
                        {status.label}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
              <div
                style={{
                  color: "red",
                  display: "none",
                }}
                id={"statusError"}
              >
                Please Enter Status
              </div>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <Button
                    // type="submit"
                    className="btn btn-success save-user"
                    onClick={handleUpdateClick}
                  >
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal} toggle={toggle} className="overflow-visible">
        <ModalHeader toggle={toggle} tag="h4">
          {userRole === userTypes.ROLE_TECHNICIAN
            ? "Apply for Job"
            : "Assign Technician"}
        </ModalHeader>
        <ModalBody>
          {userRole === userTypes.ROLE_TECHNICIAN ? (
            <>
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
                        type="text"
                        className="form-control"
                        // placeholder="Insert Technician"
                        // onChange={handleSelectTechniciansChange}
                        value={technicianData?.displayName}
                        readOnly
                      ></Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button
                        // type="submit"
                        className="btn btn-success save-user"
                        onClick={handleAssignClick}
                      >
                        Apply
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </>
          ) : (
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
                          <option key={index} value={technician?.principalId}>
                            {technician.principalDisplayName}
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
          )}
        </ModalBody>
      </Modal>
      <Col xl={3}>
        <Card>
          <CardBody>
            <h5 className="fw-semibold">Overview</h5>
            <div className="table-responsive">
              <table className="table table-styling">
                <tbody>
                  <tr>
                    <th scope="col" style={{ width: "150px" }}>
                      Job Name
                    </th>
                    <td
                      scope="col"
                      className="d-flex justify-content-center text-align-center"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {jobList.jobName}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row" style={{ width: "150px" }}>
                      Job Date
                    </th>
                    <td className="d-flex justify-content-center text-align-center">
                      {handleValidDate(jobList.jobDate)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ width: "150px" }}>
                      Job Site Id
                    </th>
                    <td className="d-flex justify-content-center text-align-center">
                      {jobList.site?.siteId}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" style={{ width: "150px" }}>
                      Total Days
                    </th>
                    <td
                      scope="col"
                      className="d-flex justify-content-center text-align-center"
                    >
                      {jobList.numberOfDays}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-2">
              <h4 className="card-title mb-2">Site Location on Map</h4>
              <div id="map" style={{ height: "300px", width: "100%" }}></div>
            </div>
            <h4 className="card-title mb-2">
              {userRole === userTypes.ROLE_TECHNICIAN ? "Apply" : "Assignees"}
            </h4>
            <div className="table-responsive">
              <table className="table table-nowrap align-middle mb-0">
                <tbody>
                  {isLoadingUser ? (
                    <tr>
                      <td colSpan="8" className="text-center">
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
                      const noOfDays = jobList.technicianLimitForEachDay[index]
                      const remainingDays =
                        noOfDays - (dayData?.userData.length || 0)

                      console.log("dayData:", dayData)
                      let bColor = "green"
                      if (remainingDays == 0) {
                        bColor = "red"
                      }
                      return (
                        <tr key={index}>
                          <td></td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0 d-flex justify-content-center text-align-center">
                              Day {index + 1}
                            </h5>
                            {userRole !== userTypes.ROLE_TECHNICIAN && (
                              <p
                                className="mt-1 d-flex justify-content-center text-align-center"
                                style={{
                                  backgroundColor: bColor,
                                  borderRadius: 10,
                                  color: "white",
                                }}
                              >
                                {remainingDays} left
                              </p>
                            )}
                          </td>

                          <td>
                            <div className="avatar-group">
                              {dayData && dayData.userData.length > 0 ? (
                                <>
                                  {/* let day_Index = {index + 1} */}
                                  {dayData.userData.map((user, userIndex) => {
                                    // console.log("user:", user)
                                    let initials = ""
                                    if (user?.name) {
                                      const nameWithoutUnderscore =
                                        user.name.replace(/^_+/, "") // Remove leading underscores
                                      initials = nameWithoutUnderscore
                                        .split(" ")
                                        .map(word => word.charAt(0))
                                        .join("")
                                    }
                                    // on hover:backgroundColor = "#358c4b"
                                    let backgroundColor = ""
                                    let statusValue = ""
                                    let CName = ""
                                    if (user?.status === "approved") {
                                      statusValue = "Approved"
                                      CName = "badge rounded-pill badge-success"
                                      backgroundColor = "#30ab4f" // Set background color to green for approved status
                                    } else if (user.status === "pending") {
                                      statusValue = "Pending"
                                      CName = "badge rounded-pill badge-warning"
                                      // backgroundColor = "#f7748c
                                      backgroundColor = "#ffc107" // Set background color to red for pending status
                                    } else if (user.status === "declined") {
                                      statusValue = "Declined"
                                      CName = "badge rounded-pill badge-danger"
                                      backgroundColor = "#807877" // Set background color to red for pending status
                                    }

                                    if (
                                      (userRole === userTypes.ROLE_TECHNICIAN &&
                                        user.userId === userId) ||
                                      (userRole !== userTypes.ROLE_TECHNICIAN &&
                                        (userRole === userTypes.ROLE_ADMIN ||
                                          userRole ===
                                            userTypes.ROLE_JOB_CREATOR ||
                                          userRole ===
                                            userTypes.ROLE_SCHEDULER ||
                                          userRole ===
                                            userTypes.ROLE_SITE_ADMIN))
                                    ) {
                                      if (
                                        userRole ===
                                          userTypes.ROLE_TECHNICIAN &&
                                        user.userId === userId
                                      ) {
                                        return (
                                          <div
                                            className="avatar-group d-flex justify-content-center text-align-center"
                                            key={userIndex}
                                          >
                                            <div className="avatar-group-item d-flex justify-content-center text-align-center">
                                              <div
                                                className="button-show"
                                                style={{
                                                  position: "relative",
                                                  width: "fit-content", // Increase the width of the avatar-group-item
                                                  height: "fit-content", // Increase the height of the avatar-group-item
                                                }}
                                                onMouseEnter={() =>
                                                  handleMouseEnter(
                                                    index + 1,
                                                    userIndex
                                                  )
                                                }
                                                onMouseLeave={() =>
                                                  handleMouseLeave(
                                                    index + 1,
                                                    userIndex
                                                  )
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  style={{
                                                    backgroundColor:
                                                      backgroundColor,
                                                    width: "100px", // Increase the width of the avatar-group-item
                                                    // height: "100px",
                                                    fontSize: 14,
                                                    borderRadius: 10,
                                                  }}
                                                  className={
                                                    userRole !==
                                                    userTypes.ROLE_TECHNICIAN
                                                      ? "btn btn-success ms-2 d-flex justify-content-center text-align-center"
                                                      : CName
                                                  }
                                                  disabled={
                                                    statusValue === "Approved"
                                                  }
                                                >
                                                  {statusValue}
                                                </button>
                                                {hoveredIndex === userIndex &&
                                                  user.status !== "approved" &&
                                                  dayIndex === index + 1 && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger btn-circle btn-sm"
                                                      style={{
                                                        position: "absolute",
                                                        top: "-5px",
                                                        right: "-5px",
                                                        borderRadius: "50%",
                                                        // padding: "3px", // Adjust the padding value for button size
                                                        fontSize: "8px", // Adjust the font size for button size
                                                      }}
                                                      onClick={() =>
                                                        onClickDelete(user.id)
                                                      }
                                                    >
                                                      <i className="fas fa-times"></i>
                                                    </button>
                                                  )}
                                              </div>
                                            </div>
                                            <Tooltip
                                              effect="solid"
                                              id={`tooltip-${userIndex}`}
                                            />
                                          </div>
                                        )
                                      } else {
                                        return (
                                          <div
                                            className="avatar-group d-flex justify-content-center text-align-center"
                                            key={userIndex}
                                          >
                                            <div
                                              className="avatar-group-item"
                                              style={{
                                                backgroundColor:
                                                  backgroundColor,
                                                // width: "45px", // Increase the width of the avatar-group-item
                                                // height: "45px", // Increase the height of the avatar-group-item
                                              }}
                                            >
                                              <div
                                                className="avatar-xs"
                                                style={{
                                                  position: "relative",
                                                  width: "42px", // Increase the width of the avatar-group-item
                                                  height: "42px", // Increase the height of the avatar-group-item
                                                }}
                                                onMouseEnter={() =>
                                                  handleMouseEnter(
                                                    index + 1,
                                                    userIndex
                                                  )
                                                }
                                                onMouseLeave={() =>
                                                  handleMouseLeave(
                                                    index + 1,
                                                    userIndex
                                                  )
                                                }
                                              >
                                                <span
                                                  className="avatar-title bg-transparent rounded-circle text-white font-size-16"
                                                  style={{
                                                    padding: "20px",
                                                    textAlign: "center",
                                                  }}
                                                  data-tooltip-id={`tooltip-${userIndex}`}
                                                  data-tooltip-content={
                                                    user.name
                                                  }
                                                  onClick={() =>
                                                    handleUpdatSpanClick(user)
                                                  }
                                                >
                                                  {initials}
                                                </span>
                                                {hoveredIndex === userIndex &&
                                                  dayIndex === index + 1 && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger btn-circle btn-sm justify-content-center align-item-center"
                                                      style={{
                                                        position: "absolute",
                                                        top: "-7px",
                                                        right: "-7px",
                                                        borderRadius: "50%",
                                                        // padding:
                                                        //   "2px 7px px 7px", // Adjust the padding value for button size
                                                        fontSize: "8px", // Adjust the font size for button size
                                                        // height: 6,
                                                        // width: 6,
                                                      }}
                                                      onClick={() =>
                                                        onClickDelete(user.id)
                                                      }
                                                    >
                                                      <i className="fas fa-times"></i>
                                                    </button>
                                                  )}
                                              </div>
                                            </div>
                                            <Tooltip
                                              effect="solid"
                                              id={`tooltip-${userIndex}`}
                                            />
                                          </div>
                                        )
                                      }
                                    }

                                    return null // Return null for other users that don't match the role conditions
                                  })}
                                  {userRole === userTypes.ROLE_TECHNICIAN &&
                                    dayData.userData.filter(
                                      user => user.userId === userId
                                    ).length === 0 &&
                                    dayData.userData.length <
                                      jobList.technicianLimitForEachDay[
                                        index
                                      ] && (
                                      <div style={{ margin: "0 auto" }}>
                                        <button
                                          type="button"
                                          id="btn-add"
                                          style={{
                                            width: "42px", // Increase the width of the avatar-group-item
                                            height: "42px",
                                          }}
                                          onClick={() => {
                                            handleApplyClick(jobList, index + 1)
                                          }}
                                          className="btn btn-success btn-rounded ms-2"
                                        >
                                          <i className="fas fa-plus align-middle"></i>
                                        </button>
                                      </div>
                                    )}

                                  {userRole === userTypes.ROLE_TECHNICIAN &&
                                    dayData.userData.filter(
                                      user => user.userId === userId
                                    ).length === 0 &&
                                    dayData.userData.length >=
                                      jobList.technicianLimitForEachDay[
                                        index
                                      ] && (
                                      <button
                                        type="button"
                                        style={{
                                          backgroundColor: "#dc3545",
                                          // width: "100px", // Increase the width of the avatar-group-item
                                          // height: "100px",
                                          fontSize: 14,
                                          borderRadius: 10,
                                        }}
                                        className="badge rounded-pill badge-danger"
                                        disabled
                                      >
                                        Limit Reached
                                      </button>
                                    )}

                                  {userRole !== userTypes.ROLE_TECHNICIAN &&
                                    dayData.userData.length <
                                      jobList.technicianLimitForEachDay[
                                        index
                                      ] && (
                                      <button
                                        type="button"
                                        id="btn-add"
                                        style={{
                                          width: "42px", // Increase the width of the avatar-group-item
                                          height: "42px",
                                        }}
                                        onClick={() => {
                                          handleClick(jobList, index + 1)
                                        }}
                                        className="btn btn-success btn-rounded ms-2"
                                      >
                                        <i className="fas fa-plus align-middle"></i>
                                      </button>
                                    )}
                                </>
                              ) : (
                                <>
                                  {userRole === userTypes.ROLE_TECHNICIAN && (
                                    <button
                                      type="button"
                                      id="btn-add"
                                      style={{
                                        width: "45px", // Increase the width of the avatar-group-item
                                        height: "45px",
                                      }}
                                      onClick={() => {
                                        handleApplyClick(jobList, index + 1)
                                      }}
                                      className="btn btn-success btn-rounded ms-2"
                                    >
                                      <i className="fas fa-plus align-middle"></i>
                                    </button>
                                  )}

                                  {userRole !== userTypes.ROLE_TECHNICIAN && (
                                    <button
                                      type="button"
                                      id="btn-add"
                                      style={{
                                        width: "45px", // Increase the width of the avatar-group-item
                                        height: "45px",
                                      }}
                                      onClick={() => {
                                        handleClick(jobList, index + 1)
                                      }}
                                      className="btn btn-success btn-rounded ms-2"
                                    >
                                      <i className="fas fa-plus align-middle"></i>
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
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
      </Col>
    </React.Fragment>
  )
}

export default Overview
