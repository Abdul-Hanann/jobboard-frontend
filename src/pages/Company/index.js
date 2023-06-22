import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "./TableContainer"
import * as Yup from "yup"
import { useFormik } from "formik"
import { jobWbsData } from "common/data/jobWbsData"

//import components
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
  deleteJobList as onDeleteJobList,
  fetchJobList,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import LazyLoadImage from "components/Common/LazyLoadImage"
import Dropzone from "react-dropzone"
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

function Company() {
  //meta title
  document.title = "Job Wbs | SAIT Job Board"

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [jobsList, setJobsList] = useState([])
  const [job, setJob] = useState(null)
  const dispatch = useDispatch()
  // const { jobs } = useSelector(state => state.JobListReducer)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (job && job.name) || "",
      tasks: (job && job.tasks) || "",
      id: (job && job.id) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Job Name"),
      tasks: Yup.string().required("Please Enter Your Job Date"),
      id: Yup.string().required("Please Enter Your Job Site ID"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateJobList = {
          id: job ? job.id : 0,
          name: values.name,
          tasks: values.tasks,
        }
        // update Job
        // dispatch(onUpdateJobList(updateJobList))
        validation.resetForm()
      } else {
        const newJobList = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          // JobNo: values["JobNo"],
          name: values["name"],
          tasks: values["tasks"],
          id: values["id"],
        }
        // save new Job
        // dispatch(onAddNewJobList(newJobList))
        validation.resetForm()
      }
      toggle()
    },
  })

  const toggle = () => {
    if (modal) {
      setModal(false)
      setJob(null)
    } else {
      setModal(true)
    }
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

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Admin" breadcrumbItem="Company" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Add Company</h5>
                    <div className="flex-shrink-0">
                      <Link
                        to="/company/create"
                        className="btn btn-primary me-1"
                        style={{ backgroundColor: "green" }}
                      >
                        Add Company
                      </Link>
                    </div>
                  </div>
                </CardBody>
                <TableContainer
                  columns={[]}
                  data={jobWbsData}
                  isGlobalFilter={true}
                  isAddOptions={false}
                  isJobListGlobalFilter={true}
                  customPageSize={1}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Company
