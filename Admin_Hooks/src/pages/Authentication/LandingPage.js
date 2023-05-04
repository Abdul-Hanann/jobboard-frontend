import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="h-100 flex-column">
              {/*<div className="p-4 m-auto">*/}
                <div className="row">
                  <div className="col-lg-6">
                    <h1 className="text-primary fw-bold">Stress-Free IT</h1>
                    <h2 className="text-primary">We are your company’s managed IT department</h2>
                  </div>
                  <div className="hero-img"/>

                  {/*<div className="col-lg-4">*/}
                  {/*  <img src={require('../../assets/images/main-hero.png.webp')}/>*/}
                  {/*</div>*/}
                {/*</div>*/}

                  {/*  <div className="text-center">*/}
                  {/*    <h4 className="mb-3">*/}
                  {/*      <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>*/}
                  {/*      <span className="text-primary">5k</span>+ Satisfied*/}
                  {/*      clients*/}
                  {/*    </h4>*/}
                  {/*    <div dir="ltr">*/}
                  {/*   */}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}

              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
