import React, { useState, useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import toast from "toastr"
import "toastr/build/toastr.min.css"

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
  Form,
} from "reactstrap"

import {
  addNewJobWbs as onAddNewJobWbs,
  updateJobWbs as onUpdateJobWbs,
} from "store/actions"

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
  const [isEdit, setIsEdit] = useState(null)
  const [id, setId] = useState(null)
  const [name, setName] = useState("")
  const [indexNum, setIndexNum] = useState(0)
  const inpRow = []
  const [inputFields, setinputFields] = useState(inpRow)

  console.log("isEdit:", isEdit)
  useEffect(() => {
    if (state && state.data) {
      setData(state.data)
    }
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])
  useEffect(() => {
    if (data) {
      setId(data.id)
      setName(data.name)
      setinputFields(data.tasks)
    }
  }, [data])

  const { isLoading, successAdd, successUpdate, error } = useSelector(
    state => state.JobWbsReducer
  )
  useEffect(() => {
    if (!isEdit && !isLoading && successAdd) {
      toast.success("Data Added successfully")
      navigate("/jobWbs")
    }
    if (!isEdit && !isLoading && error) {
      toast.error("Error occurs during adding data")
    }
    if (isEdit && !isLoading && successUpdate) {
      toast.success("Data updated successfully")
      navigate("/jobWbs")
    }
    if (isEdit && !isLoading && error) {
      toast.error("Error occurs during updating data")
    }
  }, [isEdit, isLoading, successAdd, successUpdate, error])

  function handleAddFields() {
    // setIndexNum(indexNum + 1)
    const fields = [...inputFields]
    if (indexNum > 0 && !fields[indexNum]) {
      document.getElementById("taskError").style.display = "block"
      document.getElementById("addButton").disabled = true
    } else {
      document.getElementById("taskError").style.display = "none"
      document.getElementById("addButton").disabled = false
      const item1 = []
      setinputFields([...inputFields, item1])
    }
  }
  function handleInputChange(e, index) {
    // setIndexNum(index + 1)
    const { value } = e.target
    if (value !== "") {
      const fields = [...inputFields]
      fields[index] = value
      setinputFields(fields)
      document.getElementById("taskTextError" + index).style.display = "none"
    }
  }

  function handleRemoveFields(idx) {
    const fields = [...inputFields]
    fields.splice(idx, 1)
    setinputFields(fields)
  }

  document.title = isEdit
    ? "Edit Site Admin | SAIT Job Board"
    : "Create Site Admin  | SAIT Job Board"

  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleBackClick() {
    navigate("/jobWbs")
  }

  function handleClearClick() {
    // setEditorState("")
    setinputFields([])
    setName("")
  }
  const handleNameChange = e => {
    let value = e.target.value
    setName(e.target.value)
    if (value !== "") {
      document.getElementById("nameError").style.display = "none"
    }
  }
  const validateForm = () => {
    let valid = true
    if (name === "") {
      document.getElementById("nameError").style.display = "block"
      valid = false
    } else {
      document.getElementById("nameError").style.display = "none"
    }
    inputFields.forEach((field, key) => {
      if (field[key] === "" || field[key] === undefined) {
        document.getElementById("taskTextError" + key).style.display = "block"
        valid = false
      } else {
        document.getElementById("taskTextError" + key).style.display = "none"
      }
    })
    if (inputFields.length === 0) {
      document.getElementById("taskError").style.display = "block"
      valid = false
    } else {
      document.getElementById("taskError").style.display = "none"
    }
    return valid
  }
  const handleSubmit = () => {
    if (validateForm()) {
      let data = {
        name: name,
        tasks: inputFields,
      }

      let input = { id: id, data: data }
      if (isEdit) {
        console.log("edit")
        dispatch(onUpdateJobWbs(input))
      } else {
        console.log("create")
        dispatch(onAddNewJobWbs(data))
      }
    } else {
      console.log("Check fields")
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
                        {isEdit ? "Edit Wbs" : "Create Wbs"}
                      </CardTitle>
                    </Col>
                    <Col
                      className="mx-1 d-flex justify-content-end"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <button
                        // type="submit"
                        className="btn btn-dark w-xl d-flex justify-content-center align-items-center"
                        onClick={handleBackClick}
                      >
                        Back
                      </button>
                      <button
                        // type="submit"
                        className="btn btn-danger w-xl ms-4 d-flex justify-content-center align-items-center"
                        onClick={handleClearClick}
                      >
                        Clear
                      </button>
                    </Col>
                  </Row>

                  <Form>
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
                              // validate={{
                              //   required: { value: true },
                              // }}
                              onChange={e => {
                                handleNameChange(e)
                              }}
                              // onChange={e => {
                              //   setName(e.target.value)
                              // }}
                              value={name}
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"nameError"}
                            >
                              Please Enter Your Wbs Name
                            </div>
                          </Col>
                        </FormGroup>
                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label className="col-form-label col-lg-2">
                              Add Task
                            </Label>
                            <div
                              className="inner col-lg-10 ml-md-auto"
                              id="repeater"
                            >
                              {inputFields.map((field, key) => (
                                <div
                                  key={key}
                                  id={"nested" + key}
                                  className="mb-3 row align-items-center"
                                >
                                  <Col md="10">
                                    <input
                                      type="text"
                                      className="inner form-control"
                                      value={field}
                                      onChange={e => handleInputChange(e, key)}
                                      placeholder="Enter Task..."
                                    />
                                    <div
                                      style={{
                                        color: "red",
                                        display: "none",
                                      }}
                                      id={"taskTextError" + key}
                                    >
                                      Please Enter Your Wbs Task
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="inner"
                                        onClick={() => {
                                          handleRemoveFields(key)
                                        }}
                                        block
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Col>
                                </div>
                              ))}
                              <Col md="2">
                                <div className="mt-2 mt-md-0 d-grid">
                                  <Button
                                    id="addButton"
                                    color="primary"
                                    className="inner"
                                    onClick={handleAddFields}
                                  >
                                    Add
                                  </Button>
                                </div>
                                {/* <FormFeedback
                                  id="taskError"
                                  style={{ display: "none" }}
                                  type="invalid"
                                >
                                  Please Enter Your Wbs Tasks
                                </FormFeedback> */}
                                <div
                                  style={{
                                    color: "red",
                                    display: "none",
                                  }}
                                  id={"taskError"}
                                >
                                  Please Enter Your Wbs Tasks
                                </div>
                              </Col>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Col className="mx-1">
                        <div className="text-end">
                          <Button
                            // type="submit"
                            onClick={handleSubmit}
                            className="btn btn-success save-user w-25"
                          >
                            {!!isEdit ? "Update" : "Create"}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
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
