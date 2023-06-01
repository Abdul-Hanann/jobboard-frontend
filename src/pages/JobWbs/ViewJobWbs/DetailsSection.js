import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Card, CardBody, Col } from "reactstrap"

//import images
import wechat from "../../../assets/images/companies/wechat.svg"

const DetailsSection = ({ jobWbs }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/jobWbs")
  }
  return (
    <React.Fragment>
      <Col xl={9}>
        <Card>
          <CardBody className="border-bottom">
            <div className="d-flex align-items-center">
              <img src={wechat} alt="" height="50" />
              <div className="flex-grow-1 ms-3">
                <h5 className="fw-semibold">{jobWbs?.name}</h5>
                {/* <ul className="list-unstyled hstack gap-2 mb-0">
                  <li>
                    <i className="bx bx-building-house"></i>{" "}
                    <span className="text-muted">{"ASDOASODK"}</span>
                  </li>
                  <li>
                    <i className="bx bx-map"></i>{" "}
                    <span className="text-muted">California</span>
                  </li>
                </ul> */}
              </div>
              <button
                className="btn btn-dark w-lg d-flex justify-content-center align-items-center"
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>
          </CardBody>
          <CardBody>
            <h5 className="fw-semibold mb-3">Tasks</h5>
            <ul className="text-muted">
              {jobWbs?.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default DetailsSection
