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
import JobsList from "./jobListView"

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

  // validation
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     // JobNo: (job && job.JobNo) || '',
  //     JobName: (job && job.JobName) || "",
  //     JobDate: (job && job.JobDate) || "",
  //     JobNoOfDays: (job && job.JobNoOfDays) || "",
  //     JobSiteId: (job && job.JobSiteId) || "",
  //     JobNotes: (job && job.JobNotes) || "",
  //     JobWBS: (job && job.JobWBS) || "",
  //   },
  //   validationSchema: Yup.object({
  //     // JobNo: Yup.string().matches(
  //     //     /[0-9\.\-\s+\/()]+/,
  //     //     "Please Enter Valid Job Id"
  //     // ).required("Please Enter Your Job Id"),
  //     JobName: Yup.string().required("Please Enter Your Job Name"),
  //     JobDate: Yup.string().required("Please Enter Your Job Date"),
  //     JobNoOfDays: Yup.string().required("Please Enter Your Job No of Days"),
  //     JobSiteId: Yup.string().required("Please Enter Your Job Site ID"),
  //     JobNotes: Yup.string().required("Please Enter Your Job Notes"),
  //     JobWBS: Yup.string().required("Please Enter Your JobWBS"),
  //   }),
  //   onSubmit: values => {
  //     console.log("values:", values)
  //     if (isEdit) {
  //       const updateJobList = {
  //         id: job ? job.id : 0,
  //         // JobNo: values.JobNo,
  //         JobName: values.JobName,
  //         JobDate: values.JobDate,
  //         JobNoOfDays: values.JobNoOfDays,
  //         JobSiteId: values.JobSiteId,
  //         JobNotes: values.JobNotes,
  //         JobWBS: values.JobWBS,
  //         // postedDate: "02 June 2021",
  //         // lastDate: "25 June 2021",
  //         // status: values.status,
  //       }
  //       // update Job
  //       dispatch(onUpdateJobList(updateJobList))
  //       validation.resetForm()
  //     } else {
  //       const newJobList = {
  //         id: Math.floor(Math.random() * (30 - 20)) + 20,
  //         // JobNo: values["JobNo"],
  //         JobName: values["JobName"],
  //         JobDate: values["JobDate"],
  //         JobNoOfDays: values["JobNoOfDays"],
  //         JobSiteId: values["JobSiteId"],
  //         JobNotes: values["JobNotes"],
  //         JobWBS: values["JobWBS"],
  //         // postedDate: "02 June 2021",
  //         // lastDate: "25 June 2021",
  //         // status: values["status"],
  //       }
  //       // save new Job
  //       dispatch(onAddNewJobList(newJobList))
  //       validation.resetForm()
  //     }
  //     toggle()
  //   },
  // })
  // const { projects } = useSelector(state => ({
  //   projects: state.projects.projects,
  // }))

  // useEffect(() => {
  //   dispatch(fetchJobList())
  // }, [])

  // useEffect(() => {
  //   setJobsList(jobs)
  // }, [jobs])

  // useEffect(() => {
  //   if (!isEmpty(jobs) && !!isEdit) {
  //     setJobsList(jobs)
  //     setIsEdit(false)
  //   }
  // }, [jobs])

  // const toggle = () => {
  //   if (modal) {
  //     setModal(false)
  //     setJob(null)
  //   } else {
  //     setModal(true)
  //   }
  // }

  // const handleJobClick = arg => {
  //   const job = arg
  //   setJob({
  //     id: job.id,
  //     // JobNo: job.JobNo,
  //     JobName: job.JobName,
  //     JobDate: job.JobDate,
  //     JobNoOfDays: job.JobNoOfDays,
  //     JobSiteId: job.JobSiteId,
  //     JobNotes: job.JobNotes,
  //     JobWBS: job.JobWBS,
  //     // status: job.status,
  //   })

  //   setIsEdit(true)

  //   toggle()
  // }

  return (
    <React.Fragment>
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
                    <div className="flex-shrink-0 mb-0">
                      <Link
                        to="/joblist/jobcreate"
                        className="btn btn-primary me-1"
                        style={{ backgroundColor: "green" }}
                      >
                        Create New Job
                      </Link>
                    </div>
                  </div>
                </CardBody>
                <div>
                  <JobsList />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default JobList
