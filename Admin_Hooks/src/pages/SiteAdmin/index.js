import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
// import { isEmpty } from "lodash"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "./TableContainer"
// import * as Yup from "yup"
// import { useFormik } from "formik"
// import { siteData } from "common/data/siteAdminData"

//import components
import Breadcrumbs from "components/Common/Breadcrumb"
// import DeleteModal from "components/Common/DeleteModal"
import "react-datepicker/dist/react-datepicker.css"

import {
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
  deleteJobList as onDeleteJobList,
  fetchSites,
} from "store/actions"
// redux
import { useSelector, useDispatch } from "react-redux"

import { Col, Row, Card, CardBody } from "reactstrap"

function SiteAdmin() {
  //meta title
  document.title = "Site Admin | SAIT Job Board"

  // const [modal, setModal] = useState(false)

  // const [sitesList, setSitesList] = useState([])
  // // const [job, setJob] = useState(null)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchSites())
  // }, [])
  // const { sites } = useSelector(state => state.SitesReducer)
  // // console.log("sites:", sites)

  // useEffect(() => {
  //   setSitesList(sites)
  // }, [sites])

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

  //delete Job
  // const [deleteModal, setDeleteModal] = useState(false)

  // const onClickDelete = job => {
  //   setJob(job)
  //   setDeleteModal(true)
  // }
  // console.log("site data.....:", sitesList)
  // const handleDeletejob = () => {
  //   if (job && job.id) {
  //     dispatch(onDeleteJobList(job.id))
  //     setDeleteModal(false)
  //   }
  // }
  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Admin" breadcrumbItem="Site Admin" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      Add Site Admin
                    </h5>
                    <div className="flex-shrink-0">
                      <Link
                        to="/siteadmin/create"
                        // onClick={() => setModal(true)}
                        className="btn btn-primary me-1"
                        style={{ backgroundColor: "green" }}
                      >
                        Add Site Admin
                      </Link>
                    </div>
                  </div>
                </CardBody>
                {/* <CardBody style={{ paddingTop: 5 }}> */}
                <TableContainer
                  columns={[]}
                  data={[]}
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

export default SiteAdmin
