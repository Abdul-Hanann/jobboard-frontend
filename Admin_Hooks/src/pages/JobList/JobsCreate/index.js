import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

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
  //meta title
  document.title = "Create Task | Skote - React Admin & Dashboard Template"

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // JobNo: (job && job.JobNo) || '',
      JobName: "",
      JobDate: "",
      JobNoOfDays: "",
      JobSiteId: "",
      JobNotes: "",
      JobWBS: "",
    },
    validationSchema: Yup.object({
      // JobNo: Yup.string().matches(
      //     /[0-9\.\-\s+\/()]+/,
      //     "Please Enter Valid Job Id"
      // ).required("Please Enter Your Job Id"),
      JobName: Yup.string().required("Please Enter Your Job Name"),
      JobDate: Yup.string().required("Please Enter Your Job Date"),
      JobNoOfDays: Yup.string().required("Please Enter Your Job No of Days"),
      JobSiteId: Yup.string().required("Please Enter Your Job Site ID"),
      JobNotes: Yup.string().required("Please Enter Your Job Notes"),
      JobWBS: Yup.string().required("Please Enter Your JobWBS"),
    }),
    onSubmit: values => {
      console.log("okay")
      console.log("values:", values)
      if (isEdit) {
        const updateJobList = {
          id: job ? job.id : 0,
          // JobNo: values.JobNo,
          JobName: values.JobName,
          JobDate: values.JobDate,
          JobNoOfDays: values.JobNoOfDays,
          JobSiteId: values.JobSiteId,
          JobNotes: values.JobNotes,
          JobWBS: values.JobWBS,
          // postedDate: "02 June 2021",
          // lastDate: "25 June 2021",
          // status: values.status,
        }
        // update Job
        dispatch(onUpdateJobList(updateJobList))
        validation.resetForm()
      } else {
        const newJobList = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          // JobNo: values["JobNo"],
          JobName: values["JobName"],
          JobDate: values["JobDate"],
          JobNoOfDays: values["JobNoOfDays"],
          JobSiteId: values["JobSiteId"],
          JobNotes: values["JobNotes"],
          JobWBS: values["JobWBS"],
          // postedDate: "02 June 2021",
          // lastDate: "25 June 2021",
          // status: values["status"],
        }
        // save new Job
        console.log("okay")
        dispatch(onAddNewJobList(newJobList))
        validation.resetForm()
      }
      toggle()
    },
  })

  const inpRow = [{ name: "", file: "" }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)

  const navigate = useNavigate()

  function handleClick() {
    navigate("/joblist")
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
          <Breadcrumbs title="Jobs List" breadcrumbItem="Create job list" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className="mb-4">Create New Job</CardTitle>
                    </Col>
                    <Col
                      lg="1"
                      className="mx-1"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-clear"
                          style={{
                            width: "100px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                          onClick={handleClick}
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
                          type="submit"
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
                            htmlFor="jobName"
                            className="col-form-label col-lg-2"
                          >
                            Job Name
                          </Label>
                          <Col lg="10">
                            <Input
                              id="jobName"
                              name="jobName"
                              type="text"
                              className="form-control"
                              placeholder="Enter Task Name..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.jobName || ""}
                              invalid={
                                validation.touched.jobName &&
                                validation.errors.jobName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.jobName &&
                            validation.errors.jobName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.jobName}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label className="col-form-label col-lg-2">
                              Job Date
                            </Label>
                            <div
                              className="inner col-lg-10 ml-md-auto"
                              id="repeater"
                            >
                              {/* {inputFields.map((field, key) => (*/}
                              <div
                                // key={key}
                                // id={"nested" + key}
                                className="mb-3 row align-items-center"
                              >
                                <Col md="5">
                                  <DatePicker
                                    name="JobDate"
                                    selected={validation.values.JobDate}
                                    placeholderText="Insert Job Date"
                                    onChange={date =>
                                      validation.setFieldValue("JobDate", date)
                                    }
                                    onBlur={validation.handleBlur}
                                    dateFormat="yyyy-MM-dd"
                                    // showTimeInput
                                    className={
                                      validation.touched.JobDate &&
                                      validation.errors.JobDate
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                  />
                                  {validation.touched.JobDate &&
                                  validation.errors.JobDate ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.JobDate}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                                <Col md="2">
                                  <Label>Job No of Days</Label>
                                </Col>
                                <Col md="5">
                                  <div className="mt-4 mt-md-0">
                                    <Input
                                      name="JobNoOfDays"
                                      placeholder="Insert Job No Of Days"
                                      type="number"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={
                                        validation.values.JobNoOfDays || ""
                                      }
                                      invalid={
                                        validation.touched.JobNoOfDays &&
                                        validation.errors.JobNoOfDays
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.touched.JobNoOfDays &&
                                    validation.errors.JobNoOfDays ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.JobNoOfDays}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                              </div>
                              {/* ))} */}
                            </div>
                          </div>
                        </div>

                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="taskname"
                            className="col-form-label col-lg-2"
                          >
                            Job Site Id
                          </Label>
                          <Col lg="10">
                            <Input
                              name="JobSiteId"
                              type="select"
                              placeholder="Insert Job Site Id"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.JobSiteId || ""}
                              invalid={
                                validation.touched.JobSiteId &&
                                validation.errors.JobSiteId
                                  ? true
                                  : false
                              }
                            >
                              <option>Select Site id</option>
                              <option>site id 1</option>
                              <option>site id 2</option>
                            </Input>
                            {validation.touched.JobSiteId &&
                            validation.errors.JobSiteId ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobSiteId}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Job Notes
                          </Label>
                          <Col lg="10">
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              placeholder="Place Your Content Here..."
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.JobNotes || ""}
                              invalid={
                                validation.touched.JobNotes &&
                                validation.errors.JobNotes
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.JobNotes &&
                            validation.errors.JobNotes ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobNotes}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="taskname"
                            className="col-form-label col-lg-2"
                          >
                            Job WBS
                          </Label>
                          <Col lg="10">
                            <Input
                              name="JobWBS"
                              type="select"
                              className="form-select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.JobWBS || ""}
                              invalid={
                                validation.touched.JobWBS &&
                                validation.errors.JobWBS
                                  ? true
                                  : false
                              }
                            >
                              <option>Select Job WBS</option>
                              <option>Job 1</option>
                              <option>Job 2</option>
                            </Input>
                            {validation.touched.JobWBS &&
                            validation.errors.JobWBS ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobWBS}
                              </FormFeedback>
                            ) : null}
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
                          type="submit"
                          className="btn btn-success save-user"
                          style={{
                            width: "100px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          Create job
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
