import React from "react"
import { Link } from "react-router-dom"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

//import components
import Breadcrumbs from "components/Common/Breadcrumb"
import JobsList from "./jobListView"

import { Col, Row, Card, CardBody } from "reactstrap"

function JobList() {
  //meta title
  document.title = "Jobs List | SAIT Job Board"

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
