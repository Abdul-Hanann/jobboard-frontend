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
  useEffect(() => {
    if (state && state.data) {
      setData(state.data)
    }
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])
  console.log("isEdit:", isEdit)
  console.log("jobList:", data)
  document.title = isEdit
    ? "Edit Site Admin | SAIT Job Board"
    : "Create Site Admin  | SAIT Job Board"

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      SiteId: (data && data.siteId) || "",
      Building: (data && data.building) || "",
      AddressLine1: (data && data.addressLine1) || "",
      AddressLine2: (data && data.addressLine2) || "",
      City: (data && data.city) || "",
      State: (data && data.state) || "",
      Zipcode: (data && data.zipCode) || "",
      TimeZone: (data && data.timeZone) || "",
    },
    validationSchema: Yup.object({
      // JobNo: Yup.string().matches(
      //     /[0-9\.\-\s+\/()]+/,
      //     "Please Enter Valid Job Id"
      // ).required("Please Enter Your Job Id"),
      SiteId: Yup.string().required("Please Enter Your Site ID"),
      Building: Yup.string().required("Please Enter Your Building Name"),
      AddressLine1: Yup.string().required("Please Enter Your Address Line 1"),
      AddressLine2: Yup.string().required("Please Enter Your Address Line 2"),
      City: Yup.string().required("Please Enter Your Job City"),
      State: Yup.string().required("Please Enter Your Job State"),
      Zipcode: Yup.string().required("Please Enter Your Zip Code"),
      TimeZone: Yup.string().required("Please Enter Your Time Zone"),
    }),
    onSubmit: values => {
      console.log("okay")
      console.log("values:", values)
      if (isEdit) {
        const updateJobList = {
          id: data ? data.id : 0,
          SiteId: values.SiteId,
          Building: values.Building,
          AddressLine1: values.AddressLine1,
          AddressLine2: values.AddressLine2,
          City: values.City,
          State: values.State,
          Zipcode: values.Zipcode,
          TimeZone: values.TimeZone,
        }
        // update Job
        dispatch(onUpdateJobList(updateJobList))
        validation.resetForm()
      } else {
        const newJobList = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          SiteId: values["SiteId"],
          Building: values["Building"],
          AddressLine1: values["AddressLine1"],
          AddressLine2: values["AddressLine2"],
          City: values["City"],
          State: values["State"],
          Zipcode: values["Zipcode"],
          TimeZone: values["TimeZone"],
        }
        // save new Job
        console.log("okay")
        dispatch(onAddNewJobList(newJobList))
        validation.resetForm()
      }
      // toggle()
    },
  })

  const inpRow = [{ name: "", file: "" }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)

  const navigate = useNavigate()

  function handleBackClick() {
    navigate("/siteadmin")
  }
  const startDateChange = date => {
    setstartDate(date)
  }

  const endDateChange = date => {
    setendDate(date)
  }

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { name: "", file: "" }
    setinputFields([...inputFields, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Site Admin" breadcrumbItem="Create Site" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className="mb-4">
                        {isEdit ? "Edit Site" : "Create New Site"}
                      </CardTitle>
                    </Col>
                    <Col
                      lg="1"
                      className="mx-1"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <div className="text-end">
                        <button
                          // type="submit"
                          className="btn btn-clear"
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
                    </Col>

                    <Col
                      lg="1"
                      className="mx-1"
                      style={{
                        paddingright: 10,
                        marginRight: 30,
                        marginLeft: 0,
                      }}
                    >
                      <div className="text-end">
                        <button
                          // type="submit"
                          className="btn btn-clear"
                          style={{
                            width: "100px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </Col>
                  </Row>

                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        {/* <Row> */}
                        {/* <Col className="col-12"> */}
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="SiteId"
                            className="col-form-label col-lg-2"
                          >
                            Site Id
                          </Label>
                          <Col lg="10">
                            <Input
                              id="SiteId"
                              name="SiteId"
                              type="text"
                              className="form-control"
                              placeholder="Enter Site Id..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.SiteId || ""}
                              invalid={
                                validation.touched.SiteId &&
                                validation.errors.SiteId
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.SiteId &&
                            validation.errors.SiteId ? (
                              <FormFeedback type="invalid">
                                {validation.errors.SiteId}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="SiteId"
                            className="col-form-label col-lg-2"
                          >
                            Building
                          </Label>
                          <Col lg="10">
                            <Input
                              id="Building"
                              name="Building"
                              type="text"
                              className="form-control"
                              placeholder="Enter Building name..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Building || ""}
                              invalid={
                                validation.touched.Building &&
                                validation.errors.Building
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Building &&
                            validation.errors.Building ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Building}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="SiteId"
                            className="col-form-label col-lg-2"
                          >
                            Address Line 1
                          </Label>
                          <Col lg="10">
                            <Input
                              id="AddressLine1"
                              name="AddressLine1"
                              type="text"
                              className="form-control"
                              placeholder="Enter Address Line 1..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.AddressLine1 || ""}
                              invalid={
                                validation.touched.AddressLine1 &&
                                validation.errors.AddressLine1
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.AddressLine1 &&
                            validation.errors.AddressLine1 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.AddressLine1}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="SiteId"
                            className="col-form-label col-lg-2"
                          >
                            Address Line 2
                          </Label>
                          <Col lg="10">
                            <Input
                              id="AddressLine2"
                              name="AddressLine2"
                              type="text"
                              className="form-control"
                              placeholder="Enter Address Line 2..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.AddressLine2 || ""}
                              invalid={
                                validation.touched.AddressLine2 &&
                                validation.errors.AddressLine2
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.AddressLine2 &&
                            validation.errors.Building ? (
                              <FormFeedback type="invalid">
                                {validation.errors.AddressLine2}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label
                              htmlFor="SiteId"
                              className="col-form-label col-lg-2"
                            >
                              City
                            </Label>
                            <div
                              className="inner col-lg-10 ml-md-auto"
                              id="repeater"
                            >
                              <div
                                // key={key}
                                // id={"nested" + key}
                                className="mb-3 row align-items-center"
                              >
                                <Col md="5">
                                  <Input
                                    id="City"
                                    name="City"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter City name..."
                                    validate={{
                                      required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.City || ""}
                                    invalid={
                                      validation.touched.City &&
                                      validation.errors.City
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.City &&
                                  validation.errors.City ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.City}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                                <Col md="2">
                                  <Label
                                    htmlFor="SiteId"
                                    // className="col-form-label col-lg-2"
                                  >
                                    State
                                  </Label>
                                </Col>
                                <Col md="5">
                                  <Input
                                    id="State"
                                    name="State"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter State name..."
                                    validate={{
                                      required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.State || ""}
                                    invalid={
                                      validation.touched.State &&
                                      validation.errors.State
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.State &&
                                  validation.errors.State ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.State}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label
                              htmlFor="SiteId"
                              className="col-form-label col-lg-2"
                            >
                              Zipcode
                            </Label>
                            <div
                              className="inner col-lg-10 ml-md-auto"
                              id="repeater"
                            >
                              <div
                                // key={key}
                                // id={"nested" + key}
                                className="mb-3 row align-items-center"
                              >
                                <Col md="5">
                                  <Input
                                    id="Zipcode"
                                    name="Zipcode"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Zip Code..."
                                    validate={{
                                      required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.Zipcode || ""}
                                    invalid={
                                      validation.touched.Zipcode &&
                                      validation.errors.Zipcode
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.Zipcode &&
                                  validation.errors.Zipcode ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.Zipcode}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                                <Col md="2">
                                  <Label
                                    htmlFor="SiteId"
                                    // className="col-form-label col-lg-2"
                                  >
                                    TimeZone
                                  </Label>
                                </Col>
                                <Col md="5">
                                  <Input
                                    id="TimeZone"
                                    name="TimeZone"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Time Zone..."
                                    validate={{
                                      required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.TimeZone || ""}
                                    invalid={
                                      validation.touched.TimeZone &&
                                      validation.errors.TimeZone
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.TimeZone &&
                                  validation.errors.TimeZone ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.TimeZone}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <Row style={{ padding: 0, margin: 0 }}>
                    {/* <Col lg="7"></Col> */}
                    {/* <Col lg="2" className="mx-1" style={{ padding: 0 }}> */}
                    <Col className="mx-1">
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-success save-user"
                          style={{
                            width: "100px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          {!!isEdit ? "Edit" : "Create"}
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
