import React, { useEffect, useState } from "react"
// import { Link, withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty, map } from "lodash"
import * as moment from "moment"
import { jobsList } from "common/data/job"

import toast from "toastr"
import "toastr/build/toastr.min.css"

import ReactSelect from "react-select"
import {
  button,
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Button,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { fetchJobWbsById } from "store/actions"

//Import Component
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

//Import Image
import images from "assets/images"
import img from "assets/images/companies/img-1.png"

// import {
//   getJobList as onGetJobList,
//   addNewJobList as onAddNewJobList,
//   updateJobList as onUpdateJobList,
//   deleteJobList as onDeleteJobList,
// } from "store/actions"

import { fetchJobList, deleteJob as onDeleteJobList } from "store/actions"

import {
  getProjects as onGetProjects,
  addNewProject as onAddNewProject,
  updateProject as onUpdateProject,
  deleteProject as onDeleteProject,
} from "../../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import Select from "react-select"
import makeAnimated from "react-select/animated"

const AnimatedMulti = props => {
  const { options, value, setValue } = props
  const animatedComponents = makeAnimated()

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
    }),
  }

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      onChange={val => setValue(val)}
      value={value}
      options={options}
      styles={customStyles}
    />
  )
}

const ProjectStatus = ({ status }) => {
  switch (status) {
    case "Pending":
      return <Badge className="bg-warning"> {status} </Badge>

    case "Delay":
      return <Badge className="bg-danger"> {status} </Badge>

    case "Completed":
      return <Badge className="bg-success"> {status} </Badge>

    default:
      return <Badge className="bg-success"> {status} </Badge>
  }
}

const JobsList = () => {
  //meta title
  document.title = "Job List | SA IT Services"

  const dispatch = useDispatch()

  const [project, setProject] = useState()

  useEffect(() => {
    console.log("getting jobs")
    dispatch(fetchJobList())
  }, [dispatch])

  const { jobs, isLoading, successDelete, errorDelete, error } = useSelector(
    state => state.JobListReducer
  )
  // validation
  const [data, setData] = useState(jobs)
  const [uniqueJobNoOfDays, setUniqueJobNoOfDays] = useState(null)
  // console.log("Jobs:", jobs)
  // useEffect(() => {
  //   if (jobs) {
  //     setData(jobs)
  //     const jobNoOfDays = jobs?.map(job => job?.numberOfDays)
  //     setUniqueJobNoOfDays([...new Set(jobNoOfDays)])
  //   }
  // }, [jobs])
  // console.log("uniqueJobNoOfDays:", uniqueJobNoOfDays)
  useEffect(() => {
    if (Array.isArray(jobs)) {
      setData(jobs)
      const jobNoOfDays = jobs.map(job => job?.numberOfDays)
      setUniqueJobNoOfDays([...new Set(jobNoOfDays)])
    }
  }, [jobs])

  const [dataField, setDataField] = useState(jobsList)
  const [modal, setModal] = useState(false)
  const [filteredJobName, setFilteredJobName] = useState(null)
  const [filteredJobNoOfDays, setFilteredJobNoOfDays] = useState(null)
  const [filteredJobWbs, setFilteredJobWbs] = useState(null)
  const [filteredJobSiteId, setFilteredJobSiteId] = useState(null)
  const [filteredStartDate, setFilteredStartDate] = useState(null)

  const toggle = () => {
    if (modal) {
      setModal(false)
      setDataField(null)
    } else {
      setModal(true)
      setDataField(dataField)
    }
  }

  const navigate = useNavigate()
  const handleViewClick = job => {
    navigate("/joblist/jobDetails", { state: { job } })
  }

  const handleEditClick = jobList => {
    navigate("/joblist/editJob", {
      state: { jobList: jobList, canEdit: true },
    })
  }

  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = id => {
    dispatch(onDeleteJobList(id))
  }

  useEffect(() => {
    // if (!isLoading && !successDelete && !errorDelete && error) {
    //   toast.error("Error occurs during ferching Data")
    // }
    if (!isLoading && successDelete) {
      toast.success("Data deleted successfully")
      dispatch(fetchJobList())
    }
    if (!isLoading && errorDelete && error) {
      toast.error("Error occurs during deleting Data: ", error)
      dispatch(fetchJobList())
    }
  }, [isLoading, errorDelete, error])

  const handleDeleteOrder = () => {
    if (project && project.id) {
      dispatch(onDeleteProject(project.id))
    }
    setDeleteModal(false)
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const handleClick = () => {
    setFilteredJobName(null)
    setFilteredJobNoOfDays(null)
    setFilteredJobWbs(null)
    setFilteredJobSiteId(null)
    setFilteredStartDate(null)
    toggle()
  }
  const handleRefresh = () => {
    dispatch(fetchJobList())
  }
  const handleFilterClick = () => {
    console.log("getting jobs")

    const JobName = Array.isArray(filteredJobName)
      ? filteredJobName.map(item => item?.value)
      : []
    const JobNoOfDays = Array.isArray(filteredJobNoOfDays)
      ? filteredJobNoOfDays?.map(item => item?.value)
      : []
    const JobWbs = Array.isArray(filteredJobWbs)
      ? filteredJobWbs?.map(item => item?.value)
      : []
    const JobSiteId = Array.isArray(filteredJobSiteId)
      ? filteredJobSiteId?.map(item => item?.value)
      : []

    dispatch(
      fetchJobList(JobName, JobNoOfDays, JobWbs, JobSiteId, filteredStartDate)
    )
    toggle()
  }
  const handleDateChange = date => {
    if (date instanceof Date && !isNaN(date)) {
      setFilteredStartDate(date)
    }
  }

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} className="overflow-visible">
        <ModalHeader toggle={toggle} tag="h4">
          {/* {!!isEdit ? "Edit Job" : "Add Job"} */}
          Filter
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg="12">
                <div id="external-events" className="mt-2">
                  <p className="text-muted mt-3">Filter by Job Name </p>
                  <AnimatedMulti
                    className="custom-dropdown-menu"
                    options={
                      Array.isArray(data)
                        ? data.map((job, index) => ({
                            label: job?.jobName,
                            value: job?.jobName,
                          }))
                        : []
                    }
                    value={filteredJobName}
                    setValue={setFilteredJobName}
                  />
                  <p className="text-muted mt-3">Filter by Job Days </p>

                  <AnimatedMulti
                    className="custom-dropdown-menu"
                    options={uniqueJobNoOfDays?.map((numberOfDays, index) => ({
                      label: numberOfDays,
                      value: numberOfDays,
                    }))}
                    value={filteredJobNoOfDays}
                    setValue={setFilteredJobNoOfDays}
                  />
                  <p className="text-muted mt-3">Job Wbs </p>
                  <AnimatedMulti
                    className="custom-dropdown-menu"
                    options={
                      Array.isArray(data)
                        ? data.map((job, index) => ({
                            label: job?.jobWbs?.name,
                            value: job?.jobWbs?.id,
                          }))
                        : []
                    }
                    value={filteredJobWbs}
                    setValue={setFilteredJobWbs}
                  />
                  <p className="text-muted mt-3 mb-0">Job date </p>
                  <DatePicker
                    id="jobDate"
                    name="jobDate"
                    selected={filteredStartDate}
                    placeholderText="Insert Job Date"
                    onChange={handleDateChange}
                    className="form-control"
                  />
                  <p className="text-muted mt-3">Filter by Job Site Id</p>
                  <AnimatedMulti
                    className="custom-dropdown-menu"
                    options={
                      Array.isArray(data)
                        ? data.map((job, index) => ({
                            label: job?.site?.siteId,
                            value: job?.site?.id,
                          }))
                        : []
                    }
                    value={filteredJobSiteId}
                    setValue={setFilteredJobSiteId}
                  />
                </div>
              </Col>
              <Col>
                <div className="text-end mt-2">
                  <Button
                    type="button"
                    className="btn btn-success save-user"
                    onClick={handleFilterClick}
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div>
        <Row>
          <div className="d-flex d-flex justify-content-end mt-1">
            <div className="flex-shrink-0" style={{ marginRight: 20 }}>
              <button
                // className="btn btn-primary mdi mdi-filter ms-2"
                className="btn btn-primary mdi mdi-filter me-1"
                style={{ backgroundColor: "green" }}
                // onClick={() => handleSearch(searchInput, filterOption)}
                onClick={() => handleClick()}
              >
                {/* Search */}
              </button>
              <button
                // className="btn btn-primary mdi mdi-refresh ms-2"
                className="btn btn-primary mdi mdi-refresh me-1"
                style={{ backgroundColor: "green" }}
                onClick={() => handleRefresh()}
              >
                {/* Refresh */}
              </button>
            </div>
          </div>
          {/* </div> */}
          <Col lg="12">
            <div>
              <div className="table-responsive">
                <Table
                  className="project-list-table table-nowrap align-middle table-borderless"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr
                      style={{
                        fontSize: 14,
                        backgroundColor: "#003768",
                        color: "white",
                        // textAlign: "center",
                      }}
                    >
                      <th scope="col" style={{ width: "100px" }}>
                        Logo
                      </th>
                      <th scope="col">Job Name</th>
                      <th scope="col">Job Date</th>
                      <th scope="col">Job No Of Days</th>
                      <th scope="col">Job Site Id</th>
                      {/* <th scope="col">Job Notes</th> */}
                      <th scope="col">Job WBS</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            {/* <i className="mdi mdi-table-off font-size-24 text-muted" /> */}
                            <h3>No data available</h3>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      map(data, (job, index) => (
                        <tr key={index}>
                          <td>
                            {/* {jobList.id} */}
                            <img src={img} alt="" className="avatar-sm" />
                            {/* <img src={img} alt="" className="avatar-sm" /> */}
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14">
                              {/* <Link
                              to={`/projects-overview/${project.id}`}
                              className="text-dark"
                            > */}
                              {/* <img src={img} alt="" className="avatar-sm" /> */}
                              {job.jobName}
                              {/* </Link> */}
                            </h5>
                          </td>
                          <td>
                            {" "}
                            <p>{handleValidDate(job.jobDate)}</p>
                          </td>
                          <td>
                            <p> {job.numberOfDays}</p>
                          </td>
                          <td>
                            <p> {job.site?.siteId}</p>
                          </td>
                          <td>
                            <p> {job.jobWbs?.name || "N/A"}</p>
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                // href="#"
                                className="card-drop"
                                tag="a"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                  onClick={() => handleViewClick(job)}
                                >
                                  <i className="mdi mdi-view-dashboard font-size-16 text-success me-1" />{" "}
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleEditClick(job)}
                                >
                                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => onClickDelete(job.id)}
                                >
                                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      )).reverse()
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>

        {/* <Row>
          <Col xs="12">
            <div className="text-center my-3">
              <Link to="#" className="text-success">
                <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                Load more
              </Link>
            </div>
          </Col>
        </Row> */}
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default withRouter(JobsList)
