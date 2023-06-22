import React, { Component } from "react"
import { Row, Col, Button, UncontrolledTooltip, ButtonGroup } from "reactstrap"
import src from "../../../assets/images/user-placeholder.png"
// import { withNamespaces } from "react-i18next";
import LoadingButton from "../LoadingButton/LoadingButton"
//Image Cropper
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
class ImageCropper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      src,
      cropResult: null,
      zoom: 0.5,
      dragMode: "crop",
      rotate: 0,
      viewMode: 0,
      loader: false,
    }
  }
  componentDidMount = () => {
    if (this.props.imageSrc) {
      this.setState({ src: this.props.imageSrc.preview })
    }
  }

  cancel = () => {
    this.props.closeImageUploader()
  }

  cropImage = () => {
    this.setState({ loader: true })
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      this.setState({ loader: false })

      return
    }

    this.cropper
      .getCroppedCanvas({
        maxWidth: 400,
        maxHeight: 400,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      })
      .toBlob(
        blob => {
          this.props.onImageReady(blob)
          this.setState({ loader: false })
        },
        this.props.imageSrc.type,
        1
      )
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Row>
              <Col xs="12">
                <Row>
                  <Col xl="12">
                    <div className="img-container mb-2">
                      <Cropper
                        aspectRatio={1 / 1}
                        minCropBoxHeight={200}
                        minCropBoxWidth={200}
                        // minCanvasHeight={400}
                        // minCanvasWidth={400}
                        style={{
                          height: "60vh",
                          width: "100%",
                        }}
                        preview=".img-preview"
                        src={this.state.src}
                        ref={cropper => {
                          this.cropper = cropper
                        }}
                        zoomTo={this.state.zoom}
                        dragMode={this.state.dragMode}
                        rotateTo={this.state.rotate}
                        background={false}
                        viewMode={1}
                      />
                    </div>
                  </Col>
                </Row>
                <Row id="actions">
                  <Col xl="12" className="img-crop-preview-btns docs-buttons">
                    <div className="button-items mt-2">
                      <Row>
                        <Col
                          md="12"
                          className="d-flex w-100 justify-content-center align-self-centerl"
                        >
                          <ButtonGroup>
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                this.setState({ zoom: this.state.zoom + 0.1 })
                              }
                            >
                              <span className="docs-tooltip" id="zoom1">
                                <span className="mdi mdi-magnify-plus-outline"></span>
                              </span>
                              <UncontrolledTooltip
                                placement="top"
                                target="zoom1"
                              >
                                Zoom In
                              </UncontrolledTooltip>
                            </Button>
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                this.setState({ zoom: this.state.zoom - 0.1 })
                              }
                            >
                              <span className="docs-tooltip" id="zoom2">
                                <span className="mdi mdi-magnify-minus-outline"></span>
                              </span>
                              <UncontrolledTooltip
                                placement="top"
                                target="zoom2"
                              >
                                Zoom out
                              </UncontrolledTooltip>
                            </Button>
                          </ButtonGroup>

                          <ButtonGroup>
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                this.setState({
                                  rotate: this.state.rotate - 90,
                                })
                              }
                            >
                              <span className="docs-tooltip" id="rotate1">
                                <span className="mdi mdi-rotate-left"></span>
                              </span>
                              <UncontrolledTooltip
                                placement="top"
                                target="rotate1"
                              >
                                Rotate Left
                              </UncontrolledTooltip>
                            </Button>
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                this.setState({
                                  rotate: this.state.rotate + 90,
                                })
                              }
                            >
                              <span className="docs-tooltip" id="rotate2">
                                <span className="mdi mdi-rotate-right"></span>
                              </span>
                              <UncontrolledTooltip
                                placement="top"
                                target="rotate2"
                              >
                                Rotate Right
                              </UncontrolledTooltip>
                            </Button>
                          </ButtonGroup>

                          <ButtonGroup>
                            <Button
                              type="button"
                              color="primary"
                              onClick={() => this.cropper.reset()}
                            >
                              <span className="docs-tooltip" id="reset_changes">
                                <span className="bx bx-refresh"></span>
                              </span>
                              <UncontrolledTooltip
                                placement="top"
                                target="reset_changes"
                              >
                                Reset Changes
                              </UncontrolledTooltip>
                            </Button>
                          </ButtonGroup>
                        </Col>
                        <Col
                          md="12"
                          className="d-flex w-100 justify-content-center align-self-centerl"
                        >
                          {this.state.loader ? (
                            <LoadingButton
                              htmlType="submit"
                              buttonText="Uploading"
                              load={this.state.loader}
                              buttonColor="primary"
                              buttonSize="lg"
                            />
                          ) : (
                            <Button
                              className="btn btn-primary btn-lg waves-effect waves-light"
                              type="button"
                              color="primary"
                              onClick={() => {
                                this.cropImage()
                              }}
                            >
                              <i className="bx bx-upload align-middle mr-2"></i>
                              Upload
                            </Button>
                          )}
                          <Button
                            className="btn btn-primary btn-lg waves-effect waves-light"
                            type="button"
                            color="primary"
                            onClick={() => {
                              this.cancel()
                            }}
                          >
                            <i className="bx bx-exit align-middle mr-2"></i>
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default ImageCropper
