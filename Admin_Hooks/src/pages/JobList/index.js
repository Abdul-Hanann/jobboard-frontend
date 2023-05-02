import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "components/Common/TableContainer"
import * as Yup from "yup"
import { useFormik } from "formik"
// import { jobs } from "common/data"

//import components
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ProjectsList from "./jobListView"

import { map } from "lodash"

import {
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
  deleteJobList as onDeleteJobList,
  fetchJobList,
} from "store/actions"

import {
  JobName,
  JobDate,
  JobNoOfDays,
  JobSiteId,
  JobNotes,
  JobWBS,
} from "./JobListCol"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Table,
  Badge,
  FormFeedback,
  Label,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

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

function JobList() {
  //meta title
  document.title = "Jobs List | SAIT Job Board"

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [jobsList, setJobsList] = useState([])
  const [job, setJob] = useState(null)
  const dispatch = useDispatch()
  const { jobs } = useSelector(state => state.JobListReducer)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // JobNo: (job && job.JobNo) || '',
      JobName: (job && job.JobName) || "",
      JobDate: (job && job.JobDate) || "",
      JobNoOfDays: (job && job.JobNoOfDays) || "",
      JobSiteId: (job && job.JobSiteId) || "",
      JobNotes: (job && job.JobNotes) || "",
      JobWBS: (job && job.JobWBS) || "",
    },
    validationSchema: Yup.object({
      // JobNo: Yup.string().matches(
      //     /[0-9\.\-\s+\/()]+/,
      //     "Please Enter Valid Job Id"
      // ).required("Please Enter Your Job Id"),
      JobName: Yup.string().required("Please Enter Your Job Name"),
      JobDate: Yup.string().required("Please Enter Your Job Date"),
      JobNoOfDays: Yup.string().required("Please Enter Your Job No of Days"),
      JobSiteId: Yup.string().required("Please Enter Your Job Site ID"),
      JobNotes: Yup.string().required("Please Enter Your Job Notes"),
      JobWBS: Yup.string().required("Please Enter Your JobWBS"),
    }),
    onSubmit: values => {
      console.log("okay")
      console.log("values:", values)
      if (isEdit) {
        const updateJobList = {
          id: job ? job.id : 0,
          // JobNo: values.JobNo,
          JobName: values.JobName,
          JobDate: values.JobDate,
          JobNoOfDays: values.JobNoOfDays,
          JobSiteId: values.JobSiteId,
          JobNotes: values.JobNotes,
          JobWBS: values.JobWBS,
          // postedDate: "02 June 2021",
          // lastDate: "25 June 2021",
          // status: values.status,
        }
        // update Job
        dispatch(onUpdateJobList(updateJobList))
        validation.resetForm()
      } else {
        const newJobList = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          // JobNo: values["JobNo"],
          JobName: values["JobName"],
          JobDate: values["JobDate"],
          JobNoOfDays: values["JobNoOfDays"],
          JobSiteId: values["JobSiteId"],
          JobNotes: values["JobNotes"],
          JobWBS: values["JobWBS"],
          // postedDate: "02 June 2021",
          // lastDate: "25 June 2021",
          // status: values["status"],
        }
        // save new Job
        console.log("okay")
        dispatch(onAddNewJobList(newJobList))
        validation.resetForm()
      }
      toggle()
    },
  })
  // const { projects } = useSelector(state => ({
  //   projects: state.projects.projects,
  // }))

  useEffect(() => {
    dispatch(fetchJobList())
  }, [])

  useEffect(() => {
    setJobsList(jobs)
  }, [jobs])

  useEffect(() => {
    if (!isEmpty(jobs) && !!isEdit) {
      setJobsList(jobs)
      setIsEdit(false)
    }
  }, [jobs])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setJob(null)
    } else {
      setModal(true)
    }
  }

  const handleJobClick = arg => {
    const job = arg
    setJob({
      id: job.id,
      // JobNo: job.JobNo,
      JobName: job.JobName,
      JobDate: job.JobDate,
      JobNoOfDays: job.JobNoOfDays,
      JobSiteId: job.JobSiteId,
      JobNotes: job.JobNotes,
      JobWBS: job.JobWBS,
      // status: job.status,
    })

    setIsEdit(true)

    toggle()
  }

  //delete Job
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = job => {
    setJob(job)
    setDeleteModal(true)
  }

  const handleDeletejob = () => {
    if (job && job.id) {
      dispatch(onDeleteJobList(job.id))
      setDeleteModal(false)
    }
  }
  const handleJobClicks = () => {
    setJobsList("")
    setIsEdit(false)
    toggle()
  }

  const columns = useMemo(
    () => [
      // {
      //     Header: 'No',
      //     accessor: 'jobId',
      //     filterable: true,
      //     Cell: (cellProps) => {
      //         return <JobNo {...cellProps} />;
      //     }
      // },
      {
        Header: "Job Name",
        accessor: "JobName",
        filterable: true,
        Cell: cellProps => {
          return <JobName {...cellProps} />
        },
      },
      {
        Header: "Job Date",
        accessor: "JobDate",
        filterable: true,
        Cell: cellProps => {
          return <JobDate {...cellProps} />
        },
      },
      {
        Header: "Job No Of Days",
        accessor: "JobNoOfDays",
        filterable: true,
        Cell: cellProps => {
          return <JobNoOfDays {...cellProps} />
        },
      },
      {
        Header: "Job Site Id",
        accessor: "JobSiteId",
        filterable: true,
        Cell: cellProps => {
          return <JobSiteId {...cellProps} />
        },
      },
      {
        Header: "Job Notes",
        accessor: "JobNotes",
        Cell: cellProps => {
          return <JobNotes {...cellProps} />
        },
      },
      {
        Header: "Job WBS",
        accessor: "JobWBS",
        Cell: cellProps => {
          return <JobWBS {...cellProps} />
        },
      },
      // {
      //     Header: 'Posted Date',
      //     accessor: 'postedDate',
      //     Cell: (cellProps) => {
      //         return <PostedDate {...cellProps} />;
      //     }
      // },
      // {
      //     Header: 'Last Date',
      //     accessor: 'lastDate',
      //     Cell: (cellProps) => {
      //         return <LastDate {...cellProps} />;
      //     }
      // },
      // {
      //     Header: 'Status',
      //     accessor: 'status',
      //     disableFilters: true,
      //     Cell: (cellProps) => {
      //         return <Status {...cellProps} />;
      //     }
      // },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-info"
                  onClick={() => {
                    const jobData = cellProps.row.original
                    handleJobClick(jobData)
                  }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original
                    onClickDelete(jobData)
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Lists" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      Create New Job
                    </h5>
                    <div className="flex-shrink-0">
                      <Link
                        to="/joblist/jobcreate"
                        // onClick={() => setModal(true)}
                        className="btn btn-primary me-1"
                        style={{ backgroundColor: "green" }}
                      >
                        Create New Job
                      </Link>
                      {/* <Link to="#!" className="btn btn-light me-1"><i className="mdi mdi-refresh"></i></Link> */}
                      {/* <UncontrolledDropdown className="dropdown d-inline-block me-1">
                                                <DropdownToggle type="menu" className="btn btn-success" id="dropdownMenuButton1">
                                                    <i className="mdi mdi-dots-vertical"></i></DropdownToggle>
                                                <DropdownMenu>
                                                    <li><DropdownItem href="#">Action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Another action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                                </DropdownMenu>
                                            </UncontrolledDropdown> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* ///////////////////////////////////////////////////////// */}
          <div>
            <ProjectsList />
          </div>
          {/* <CardBody>
                                    <TableContainer
                                        columns={columns}
                                        data={jobs}
                                        isGlobalFilter={true}
                                        isAddOptions={false}
                                        handleJobClicks={handleJobClicks}
                                        isJobListGlobalFilter={true}
                                        customPageSize={1}
                                    />
                                </CardBody> */}

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Job" : "Add Job"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Job Name</Label>
                      <Input
                        name="jobName"
                        type="text"
                        placeholder="Insert Job Name"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.jobName || ""}
                        invalid={
                          validation.touched.jobName &&
                          validation.errors.jobName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.jobName &&
                      validation.errors.jobName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.jobName}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Job Date</Label>
                      <DatePicker
                        name="JobDate"
                        selected={validation.values.JobDate}
                        placeholderText="Insert Job Date"
                        onChange={date =>
                          validation.setFieldValue("JobDate", date)
                        }
                        onBlur={validation.handleBlur}
                        dateFormat="yyyy-MM-dd"
                        // showTimeInput
                        className={
                          validation.touched.JobDate &&
                          validation.errors.JobDate
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      {validation.touched.JobDate &&
                      validation.errors.JobDate ? (
                        <FormFeedback type="invalid">
                          {validation.errors.JobDate}
                        </FormFeedback>
                      ) : null}
                    </div>

                    {/* <div className="mb-3">
                                            <Label className="form-label"> Job Date</Label>
                                            <Input
                                                name="JobDate"
                                                type="datetime"
                                                placeholder="Insert Job Date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.JobDate || ""}
                                                invalid={
                                                    validation.touched.JobDate && validation.errors.JobDate ? true : false
                                                }
                                            />
                                            {validation.touched.JobDate && validation.errors.JobDate ? (
                                                <FormFeedback type="invalid">{validation.errors.JobDate}</FormFeedback>
                                            ) : null}
                                        </div> */}
                    <div className="mb-3">
                      <Label className="form-label">Job No Of Days</Label>
                      <Input
                        name="JobNoOfDays"
                        placeholder="Insert Job No Of Days"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.JobNoOfDays || ""}
                        invalid={
                          validation.touched.JobNoOfDays &&
                          validation.errors.JobNoOfDays
                            ? true
                            : false
                        }
                      />
                      {validation.touched.JobNoOfDays &&
                      validation.errors.JobNoOfDays ? (
                        <FormFeedback type="invalid">
                          {validation.errors.JobNoOfDays}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Job Site Id</Label>
                      <Input
                        name="JobSiteId"
                        type="text"
                        placeholder="Insert Job Site Id"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.JobSiteId || ""}
                        invalid={
                          validation.touched.JobSiteId &&
                          validation.errors.JobSiteId
                            ? true
                            : false
                        }
                      />
                      {validation.touched.JobSiteId &&
                      validation.errors.JobSiteId ? (
                        <FormFeedback type="invalid">
                          {validation.errors.JobSiteId}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Job Notes</Label>
                      <Input
                        name="JobNotes"
                        type="text"
                        placeholder="Insert Job Notes"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.JobNotes || ""}
                        invalid={
                          validation.touched.JobNotes &&
                          validation.errors.JobNotes
                            ? true
                            : false
                        }
                      />
                      {validation.touched.JobNotes &&
                      validation.errors.JobNotes ? (
                        <FormFeedback type="invalid">
                          {validation.errors.JobNotes}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Job WBS</Label>
                      <Input
                        name="JobWBS"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.JobWBS || ""}
                        invalid={
                          validation.touched.JobWBS && validation.errors.JobWBS
                            ? true
                            : false
                        }
                      >
                        <option>Job 1</option>
                        <option>Job 2</option>
                        {/* <option>Freelance</option>
                                                <option>Internship</option> */}
                      </Input>
                      {validation.touched.JobWBS && validation.errors.JobWBS ? (
                        <FormFeedback type="invalid">
                          {validation.errors.JobWBS}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Create job
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}

export default JobList
