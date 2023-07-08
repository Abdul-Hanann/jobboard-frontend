import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "./TableContainer"
import { jobWbsData } from "common/data/jobWbsData"

//import components
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import { deleteJobList as onDeleteJobList } from "store/actions"

//redux
import { useDispatch } from "react-redux"

import { Col, Row, Card, CardBody } from "reactstrap"

function JobWbs() {
  //meta title
  document.title = "Job Wbs | SAIT Job Board"

  const [modal, setModal] = useState(false)
  const [job, setJob] = useState(null)
  const dispatch = useDispatch()

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
          <Breadcrumbs title="Admin" breadcrumbItem="Job Wbs" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Add Job Wbs</h5>
                    <div className="flex-shrink-0">
                      <Link
                        to="/jobWbs/create"
                        className="btn btn-primary me-1"
                        style={{ backgroundColor: "green" }}
                      >
                        Add Job Wbs
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

export default JobWbs
