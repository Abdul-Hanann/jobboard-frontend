import React from "react"
import { Link } from "react-router-dom"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "./TableContainer"

//import components
import Breadcrumbs from "components/Common/Breadcrumb"

import { Col, Row, Card, CardBody } from "reactstrap"

function SiteAdmin() {
  //meta title
  document.title = "Site Admin | SAIT Job Board"

  return (
    <React.Fragment>
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
                        className="btn btn-primary me-1"
                        style={{ backgroundColor: "green" }}
                      >
                        Add Site Admin
                      </Link>
                    </div>
                  </div>
                </CardBody>
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
