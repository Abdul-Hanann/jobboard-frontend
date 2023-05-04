import React from "react"
import { Container, Row } from "reactstrap"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DetailsSection from "./DetailsSection"

const JobDetails = () => {
  document.title = "Job Details | Skote - React Admin & Dashboard Template"
  const { state } = useLocation()
  const [jobWbs, setJobWbs] = useState(null)
  useEffect(() => {
    if (state && state.data) {
      setJobWbs(state.data)
    }
  }, [state])

  //   const { jobList } = location.state ? location.state.jobList : {}
  //   const jobList = props.location.state.jobList ? props.location.state.jobList : {}

  console.log("jobList:", jobWbs)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Admin" breadcrumbItem="Job Wbs Detail" />

          <Row>
            <DetailsSection jobWbs={jobWbs} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default JobDetails
