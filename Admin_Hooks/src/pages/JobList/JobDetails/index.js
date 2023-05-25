import React from "react"
import { Container, Row } from "reactstrap"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Overview from "./Overview"
import DetailsSection from "./DetailsSection"

const JobDetails = () => {
  document.title = "Job Details | SAIT Job Board"
  const { state } = useLocation()
  const [jobList, setJobList] = useState(state.job)
  useEffect(() => {
    if (state && state.job) {
      setJobList(state.job)
    }
  }, [state])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Jobs" breadcrumbItem="Job Details" />

          <Row>
            <Overview jobList={jobList} />
            <DetailsSection jobList={jobList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default JobDetails
