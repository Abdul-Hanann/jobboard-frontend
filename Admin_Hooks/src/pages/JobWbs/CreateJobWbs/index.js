import React, { useState, useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  FormFeedback,
  Label,
  Button,
} from "reactstrap"

import * as Yup from "yup"
import { useFormik } from "formik"
// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

const TasksCreate = () => {
  const { state } = useLocation()
  const [data, setData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [editorState, setEditorState] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if (state && state.data) {
      setData(state.data)
    }
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])

  //SET VALUES FOR UPDATE
  useEffect(() => {
    if (data) {
      setEditorState(data.tasks)
      setName(data.name)
    }
  }, [data])

  document.title = isEdit
    ? "Edit Site Admin | SAIT Job Board"
    : "Create Site Admin  | SAIT Job Board"

  const navigate = useNavigate()

  function handleBackClick() {
    navigate("/jobWbs")
  }

  function handleClearClick() {
    setEditorState("")
    setName("")
  }

  const validateForm = () => {
    let valid = true
    if (name === "") {
      document.getElementById("nameError").style.display = "block"
      valid = false
    } else {
      document.getElementById("nameError").style.display = "none"
    }
    if (
      editorState === "" ||
      editorState?.blocks.length === 0 ||
      (editorState?.blocks.length === 1
        ? editorState?.blocks[0].text === ""
        : false)
    ) {
      document.getElementById("taskEditorError").style.display = "block"
      valid = false
    } else {
      document.getElementById("taskEditorError").style.display = "none"
    }
    return valid
  }
  const handleSubmit = () => {
    if (validateForm()) {
      if (isEdit) {
        console.log("edit", name, editorState)
      } else {
        console.log("create", name, editorState)
      }
    }
  }
  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Jobs Wbs" breadcrumbItem="Create job wbs" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <CardTitle className="mb-4">
                        {isEdit ? "Edit Wbs" : "Create New Wbs"}
                      </CardTitle>
                    </Col>
                    <Col
                      className="mx-1 d-flex justify-content-end"
                      style={{ padding: 0, margin: 0 }}
                    >
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
                      <button
                        // type="submit"
                        className="btn btn-clear ms-4 h-75 d-flex justify-content-center align-items-center"
                        style={{
                          width: "100px",
                          backgroundColor: "green",
                          color: "white",
                        }}
                        onClick={handleClearClick}
                      >
                        Clear
                      </button>
                    </Col>
                  </Row>

                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        {/* <Row> */}
                        {/* <Col className="col-12"> */}
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="name"
                            className="col-form-label col-lg-2"
                          >
                            Name
                          </Label>
                          <Col lg="10">
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Enter Name..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={e => {
                                setName(e.target.value)
                              }}
                              value={name || ""}
                            />
                            <FormFeedback
                              id="nameError"
                              style={{ display: "none" }}
                              type="invalid"
                            >
                              Please Enter Your Wbs Name
                            </FormFeedback>
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="tasks"
                            className="col-form-label col-lg-2"
                          >
                            Tasks
                          </Label>
                          <Col lg="10">
                            <Input
                              id="tasks"
                              name="tasks"
                              type="textarea"
                              className="form-control"
                              placeholder="Enter Tasks..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={e => setEditorState(e.target.value)}
                              value={editorState || ""}
                              style={{ height: "200px" }}
                            />
                            {/* <Editor
                              // onEditorStateChange={validation.handleChange}
                              onChange={e => {
                                setEditorState(e)
                              }}
                              value={editorState}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                            /> */}
                            <FormFeedback
                              id="taskEditorError"
                              style={{ display: "none" }}
                              type="invalid"
                            >
                              Please Enter Your Wbs Tasks{" "}
                            </FormFeedback>
                          </Col>
                        </FormGroup>
                      </div>
                    </div>
                  </form>
                  <Row style={{ padding: 0, margin: 0 }}>
                    {/* <Col lg="7"></Col> */}
                    {/* <Col lg="2" className="mx-1" style={{ padding: 0 }}> */}
                    <Col className="mx-1">
                      <div className="text-end">
                        <button
                          // type="submit"
                          onClick={handleSubmit}
                          className="btn btn-success save-user"
                          style={{
                            width: "100px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          {!!isEdit ? "Update" : "Create"}
                        </button>
                      </div>
                    </Col>
                    {/* </Row> */}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TasksCreate
