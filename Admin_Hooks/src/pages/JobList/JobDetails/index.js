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
  const [jobList, setJobList] = useState(state.jobList)
  useEffect(() => {
    if (state && state.jobList) {
      setJobList(state.jobList)
    }
  }, [state])

  //   const { jobList } = location.state ? location.state.jobList : {}
  //   const jobList = props.location.state.jobList ? props.location.state.jobList : {}

  console.log("jobList:", jobList)

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
