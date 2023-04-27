import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Table from "./table"
import * as Yup from "yup"
import { useFormik } from "formik"
// import { jobs } from "common/data";

//import components
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
  deleteJobList as onDeleteJobList,
  fetchJobWbs,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

function JobWbs() {
  //meta title
  document.title = "Jobs List | SAIT Job Board"

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [jobWbsList, setJobWbsList] = useState([])
  const [job, setJob] = useState(null)
  const dispatch = useDispatch()
  const { jobWbs } = useSelector(state => state.JobWbsReducer)
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // JobNo: (job && job.JobNo) || '',
      name: (job && job.name) || "",
      tasks: (job && job.tasks) || [""],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required*"),
      tasks: Yup.string().required("required*"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateJobList = {
          id: job ? job._id : 0,
          name: values.name,
          tasks: values.tasks,
        }
        // update Job
        dispatch(onUpdateJobList(updateJobList))
        validation.resetForm()
      } else {
        const newJobList = {
          name: values["name"],
          tasks: values["tasks"],
        }
        // save new Job
        dispatch(onAddNewJobList(newJobList))
        validation.resetForm()
      }
      toggle()
    },
  })

  useEffect(() => {
    dispatch(fetchJobWbs())
  }, [])

  useEffect(() => {
    setJobWbsList(jobWbs)
  }, [jobWbs])

  useEffect(() => {
    if (!isEmpty(jobWbs) && !!isEdit) {
      setJobWbsList(jobWbs)
      setIsEdit(false)
    }
  }, [jobWbs])

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
    setJobWbsList("")
    setIsEdit(false)
    toggle()
  }

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
                        to="#!"
                        onClick={() => setModal(true)}
                        className="btn btn-primary me-1"
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
                <CardBody>
                  <Table data={jobWbs} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Job" : "Add Job Wbs"}
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
                      <Label className="form-label">Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Enter Job Wbs Name"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Tasks</Label>
                      {validation.values.tasks.map((input, index) => (
                        <>
                          <Input
                            key={index}
                            name="tasks"
                            type="text"
                            placeholder="Enter Job Tasks"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={event =>
                              handleTaskInputChange(index, event)
                            }
                            onBlur={validation.handleBlur}
                            value={input}
                            invalid={input === "" ? true : false}
                          />
                          {input === "" ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </>
                      ))}
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

export default JobWbs
