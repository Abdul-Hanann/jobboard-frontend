import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { parseISO } from "date-fns"
import { parse, format } from "date-fns"
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
  // const [dateString, setDateString] = useState(false)
  // const dateObject = parseISO(dateString)
  const [selectedDate, setSelectedDate] = useState(null)
  useEffect(() => {
    if (state && state.jobList) {
      setData(state.jobList)
    }
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])
  useEffect(() => {
    if (data && data.jobDate) {
      const parsedDate = parse(data.jobDate, "dd MMMM yyyy", new Date())
      setSelectedDate(parsedDate)
    }
  }, [data])
  const handleDateChange = date => {
    setSelectedDate(date)
  }
  console.log("isEdit:", isEdit)
  console.log("jobList:", data)
  console.log("selectedDate:", selectedDate)
  document.title = isEdit
    ? "Edit job List | SAIT Job Board"
    : "Create job List  | SAIT Job Board"

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // JobNo: (job && job.JobNo) || '',
      JobName: (data && data.JobName) || "",
      jobDate: (data && data.jobDate) || "",
      JobNoOfDays: (data && data.JobNoOfDays) || "",
      JobSiteId: (data && data.JobSiteId) || "",
      JobNotes: (data && data.JobNotes) || "",
      JobWBS: (data && data.JobWBS) || "",
    },
    validationSchema: Yup.object({
      // JobNo: Yup.string().matches(
      //     /[0-9\.\-\s+\/()]+/,
      //     "Please Enter Valid Job Id"
      // ).required("Please Enter Your Job Id"),
      JobName: Yup.string().required("Please Enter Your Job Name"),
      jobDate: Yup.string().required("Please Enter Your Job Date"),
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
          id: data ? data.id : 0,
          // JobNo: values.JobNo,
          JobName: values.JobName,
          jobDate: dateObject,
          JobNoOfDays: values.JobNoOfDays,
          JobSiteId: values.JobSiteId,
          JobNotes: values.JobNotes,
          JobWBS: values.JobWBS,
        }
        // update Job
        dispatch(onUpdateJobList(updateJobList))
        validation.resetForm()
      } else {
        const newJobList = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          // JobNo: values["JobNo"],
          JobName: values["JobName"],
          jobDate: values["jobDate"],
          JobNoOfDays: values["JobNoOfDays"],
          JobSiteId: values["JobSiteId"],
          JobNotes: values["JobNotes"],
          JobWBS: values["JobWBS"],
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
                      <CardTitle className="mb-4">
                        {isEdit ? "Edit Job" : "Create New Job"}
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
                        onClick={handleClick}
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
                        // onClick={handleClearClick}
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
                            htmlFor="jobName"
                            className="col-form-label col-lg-2"
                          >
                            Job Name
                          </Label>
                          <Col lg="10">
                            <Input
                              id="JobName"
                              name="JobName"
                              type="text"
                              className="form-control"
                              placeholder="Enter Job Name..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.JobName || ""}
                              invalid={
                                validation.touched.JobName &&
                                validation.errors.JobName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.JobName &&
                            validation.errors.JobName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobName}
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
                                    id="jobDate"
                                    name="jobDate"
                                    // selected={validation.values.jobDate}
                                    selected={selectedDate}
                                    placeholderText="Insert Job Date"
                                    // value={validation.values.jobDate || ""}
                                    // onChange={jobDate =>
                                    //   validation.setFieldValue(
                                    //     "JobDate",
                                    //     jobDate
                                    //   )
                                    // }
                                    onChange={date =>
                                      handleDateChange("date", date)
                                    }
                                    onBlur={validation.handleBlur}
                                    // dateFormat="yyyy-MM-dd"
                                    // showTimeInput
                                    className={
                                      validation.touched.jobDate &&
                                      validation.errors.jobDate
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                  />
                                  {validation.touched.jobDate &&
                                  validation.errors.jobDate ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.jobDate}
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
                              className="form-select"
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
                            {/* <Editor
                              id="JobNotes"
                              name="JobNotes"
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
                            ) : null} */}
                            <Input
                              id="JobNotes"
                              name="JobNotes"
                              type="textarea"
                              className="form-control"
                              placeholder="Enter Job Notes..."
                              validate={{
                                required: { value: true },
                              }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.JobNotes || ""}
                              invalid={
                                validation.touched.JobNotes &&
                                validation.errors.JobNotes
                                  ? true
                                  : false
                              }
                              style={{ height: "200px" }}
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
