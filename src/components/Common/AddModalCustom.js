import PropTypes from "prop-types"
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"

const AddModal = ({ show, jobDay, onAddClick, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h2>
                Are you sure to Apply for
                <br />
                Day {jobDay}?
              </h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3 md-2">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                onClick={onAddClick}
              >
                Yes, Applying!
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2"
                onClick={onCloseClick}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

AddModal.propTypes = {
  onCloseClick: PropTypes.func,
  onAddClick: PropTypes.func,
  show: PropTypes.any,
  jobDay: PropTypes.any,
}

export default AddModal
