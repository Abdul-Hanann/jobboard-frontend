import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"

import * as Yup from "yup"
// import Select from "react-select"
// import TextField from "@material-ui/core/TextField"
// import Autocomplete from "@material-ui/lab/Autocomplete"
// import Select from "@material-ui/core/Select"
import { useFormik } from "formik"
import { userTypes } from "pages/Authentication/userTypes"

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
} from "reactstrap"
//import images
import adobephotoshop from "../../../assets/images/companies/adobe-photoshop.svg"

const Overview = ({ jobList }) => {
  const userType = localStorage.getItem("userType")
  const [modal, setModal] = useState(false)
  const [dataField, setDataField] = useState(null)
  const [selectedGroup, setselectedGroup] = useState(null)
  const toggle = () => {
    if (modal) {
      setModal(false)
      setDataField(null)
    } else {
      setModal(true)
      setDataField(jobList)
    }
  }

  // const optionGroup = [
  //   {
  //     label: "Picnic",
  //     options: [
  //       { label: "Mustard", value: "Mustard" },
  //       { label: "Ketchup", value: "Ketchup" },
  //       { label: "Relish", value: "Relish" },
  //     ],
  //   },
  //   {
  //     label: "Camping",
  //     options: [
  //       { label: "Tent", value: "Tent" },
  //       { label: "Flashlight", value: "Flashlight" },
  //       { label: "Toilet Paper", value: "Toilet Paper" },
  //     ],
  //   },
  // ]
  const options = [
    { value: "Technician1", label: "Technician1" },
    { value: "Technician2", label: "Technician2" },
    { value: "Technician3", label: "Technician3" },
    { value: "Technician4", label: "Technician4" },
  ]

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }
  const handleClick = jobList => {
    setDataField({
      id: jobList ? jobList.id : 0,
      JobName: jobList.JobName,
      JobNoOfDays: jobList.JobNoOfDays,
      JobSiteId: jobList.JobSiteId,
      JobNotes: jobList.JobNotes,
      JobWBS: jobList.JobWBS,
    })
    toggle()
  }
  const inpRow = [{ technician: "" }]
  const [inputFields, setinputFields] = useState(inpRow)

  // Function for Create Input Fields
  function handleAddFields() {
    const newItem = { technician: "" }
    setinputFields([...inputFields, newItem])
  }

  // Function for Remove Input Fields
  // function handleRemoveFields(idx) {
  //   document.getElementById("nested" + idx).style.display = "none"
  // }
  const handleRemoveFields = key => {
    const newInputFields = [...inputFields]
    newInputFields.splice(key, 1)
    setinputFields(newInputFields)
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} className="overflow-visible">
        <ModalHeader toggle={toggle} tag="h4">
          {/* {!!isEdit ? "Edit Job" : "Add Job"} */}
          Assign Technician
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col lg="12">
                <div className="mb-3">
                  <Label>Technician</Label>
                  <Select
                    isSearchable
                    menuPosition="fixed"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 9999999 }),
                    }}
                    menuShouldScrollIntoView={false}
                    options={options}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    // type="submit"
                    className="btn btn-success save-user"
                  >
                    Assign
                  </button>
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
                  <tr>
                    <td style={{ width: "40px" }}></td>
                    <td>
                      <h5 className="text-truncate font-size-14 m-0">
                        Day 1{/* </Link> */}
                      </h5>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <div className="avatar-group-item">
                          {/* <Link to="/" className="d-inline-block"> */}
                          <img
                            src={avatar4}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                          {/* </Link> */}
                        </div>
                        <div className="avatar-group-item">
                          {/* <Link to="/" className="d-inline-block"> */}
                          <img
                            src={avatar5}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                          {/* </Link> */}
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
                    {/* <td>
                        <div className="text-center">
                          <span className="badge rounded-pill badge-soft-secondary font-size-11">
                            Waiting
                          </span>
                        </div>
                      </td> */}
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <h5 className="text-truncate font-size-14 m-0">
                        {/* <Link to="#" className="text-dark"> */}
                        Day 2{/* </Link> */}
                      </h5>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <div className="avatar-group-item">
                          {/* <Link to="#" className="d-inline-block"> */}
                          <img
                            src={avatar1}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                          {/* </Link> */}
                        </div>
                        <div className="avatar-group-item">
                          {/* <Link to="#" className="d-inline-block"> */}
                          <img
                            src={avatar2}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                          {/* </Link> */}
                        </div>
                        <div className="avatar-group-item">
                          {/* <Link to="#" className="d-inline-block"> */}
                          <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-success text-white font-size-16">
                              A
                            </span>
                          </div>
                          {/* </Link> */}
                        </div>
                        <div className="avatar-group-item">
                          <Link to="#" className="d-inline-block">
                            <img
                              src={avatar6}
                              alt=""
                              className="rounded-circle avatar-xs"
                            />
                          </Link>
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
                    {/* <td>
                        <div className="text-center">
                          <span className="badge rounded-pill badge-soft-primary font-size-11">
                            Approved
                          </span>
                        </div>
                      </td> */}
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <h5 className="text-truncate font-size-14 m-0">
                        {/* <Link to="#" className="text-dark"> */}
                        Day 3{/* </Link> */}
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
                    {/* <td>
                        <div className="text-center">
                          <span className="badge rounded-pill badge-soft-secondary font-size-11">
                            Waiting
                          </span>
                        </div>
                      </td> */}
                  </tr>
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