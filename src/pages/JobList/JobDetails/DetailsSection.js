import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, Col } from "reactstrap"

//import images
import wechat from "../../../assets/images/companies/wechat.svg"

const DetailsSection = ({ jobList }) => {
  const navigate = useNavigate()
  const [data, setData] = useState(jobList)
  useEffect(() => {
    if (jobList) {
      setData(jobList)
    }
  }, [jobList])

  const handleBackClick = () => {
    navigate("/joblist")
  }
  return (
    <React.Fragment>
      <Col xl={9}>
        <Card>
          <CardBody className="border-bottom">
            <div className="d-flex">
              <img src={wechat} alt="" height="50" />
              <div className="flex-grow-1 ms-3">
                <h5 className="fw-semibold">{jobList.jobName}</h5>
                <ul className="list-unstyled hstack gap-2 mb-0">
                  <li>
                    <i className="bx bx-building-house"></i>{" "}
                    <span className="text-muted">{jobList.site?.siteId}</span>
                  </li>
                  <li>
                    <i className="bx bx-map"></i>{" "}
                    <span className="text-muted">{jobList.site?.city}</span>
                  </li>
                </ul>
              </div>
              <button
                // type="submit"
                className="btn btn-clear h-75 d-flex justify-content-center align-items-center"
                style={{
                  width: "100px",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>
          </CardBody>
          <CardBody>
            <h5 className="fw-semibold mb-3">Description</h5>
            {/* <p className="text-muted">{jobList.notes}</p> */}
            <p
              className="text-muted"
              dangerouslySetInnerHTML={{ __html: jobList.notes }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="border-bottom">
            <div className="d-flex">
              <div className="flex-grow-1 ms-3">
                <h4>Job WBS</h4>
                <h5>{data?.jobWbs?.name}</h5>
                <ul className="text-muted">
                  {data?.jobWbs?.tasks?.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default DetailsSection
