import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col, Row } from "reactstrap"

// import saitlogo from "assets/images/SA-IT-Services-Hero-Image.webp"

import saitlogo from "assets/images/SA-IT-Services-Hero-Image-removebg-preview.png"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col
        className="heroCol"
        xl={9}
        style={{
          backgroundColor: "#e0ecf0",
          display: "flex",
        }}
      >
        {/* <div className="auth-full-bg pt-lg-5 p-4"> */}
        {/* <div className="pt-lg-5" style={{ marginBottom: 100 }}>
          <div className="w-100"></div>
        </div> */}
        <Row
          className="landing-page-row-1 mt-5 pt-5 mr-5"
          style={{ overflow: "hidden" }}
        >
          <Row
            className="landing-page-row-2"
            // style={{ overflow: "hidden", display: "inline-flex" }}
          ></Row>
          <Row
            className="landing-page-row-2"
            // style={{ overflow: "hidden", display: "inline-flex" }}
          ></Row>
          <Row
            className="landing-page-row-2"
            // style={{ overflow: "hidden", display: "inline-flex" }}
          ></Row>
          <Col xs={2} md={1} lg={1} className="mt-5"></Col>
          <Col md={5} lg={5} className="hero-area-v1 mt-5">
            <div style={{ marginTop: 150 }}>
              <h3
                className="landing-Page-text-1 mb-3"
                style={{
                  letterSpacing: 2,
                  fontFamily: "Montserrat",
                  fontSize: 65,
                  lineHeight: 1.1,
                }}
              >
                <br />
                <b>Stress-Free IT</b>
                {/* People.
                <br />
                <b>Powering</b> Care. */}
              </h3>
              <h4
                className="landing-Page-para-1 mb-4 "
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 24,
                }}
              >
                {" "}
                We are your company’s managed IT department.
              </h4>
            </div>
          </Col>

          <Col md={1} lg={1} xs={0} className="mid-col">
            {" "}
          </Col>
          <Col className="landingPageImageCol" md={5} lg={5}>
            {" "}
            {/* <div> */}
            <img
              className="img-fluid landingPageImage"
              src={saitlogo}
              // width={221}
              // height={242}
              style={{
                width: "1300px",
                height: "850px",
                marginTop: 5.39,
              }}
            ></img>
            {/* </div> */}
          </Col>
        </Row>
        {/* </div>
        </div> */}
        {/* </div> */}
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
