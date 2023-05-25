import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { parseISO } from "date-fns"
import { parse, format } from "date-fns"

import { useSelector, useDispatch } from "react-redux"
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

import {
  addNewJob as onAddNewJob,
  updateSite as onUpdateSite,
  fetchJobWbs,
  fetchSitesFilter,
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
  const [isEdit, setIsEdit] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [id, setId] = useState(null)
  const [jobName, setJobName] = useState("")
  const [jobDate, setJobDate] = useState("")
  const [jobNoOfDays, setJobNoOfDays] = useState("")
  const [jobNotes, setJobNotes] = useState("")

  const [selectedJobSiteIdOption, setSelectedJobSiteIdOption] = useState(null)
  const [selectedjobWBSOption, setSelectedjobWBSOption] = useState(null)
  // console.log("jobName:", jobName)
  // console.log("selectedDate:", selectedDate)
  // console.log("jobNoOfDays:", jobNoOfDays)
  // console.log("selectedjobWBSOption?.value:", selectedjobWBSOption?.value)
  // console.log("selectedJobSiteIdOption?.value:", selectedJobSiteIdOption?.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchJobWbs())
    dispatch(fetchSitesFilter("siteId"))
  }, [dispatch])

  const { jobWbs } = useSelector(state => state.JobWbsReducer)
  const { sites } = useSelector(state => state.SitesReducer)
  const handleSelectjobWBSChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedjobWBSOption({ label: selectedLabel, value: selectedValue })
  }
  const handleSelectChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedJobSiteIdOption({ label: selectedLabel, value: selectedValue })
    const [jobWbsId, jobWbsName] = e.target.options[e.target.selectedIndex]
      .getAttribute("data-job-wbs")
      .split(",")
    if (jobWbsId != undefined && jobWbsId != "undefined") {
      setSelectedjobWBSOption({ label: jobWbsName, value: jobWbsId })
    } else {
      setSelectedjobWBSOption({ label: "Select JobWBS", value: "" })
    }
  }

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
    if (date instanceof Date && !isNaN(date)) {
      setSelectedDate(date)
    }
  }
  console.log("isEdit:", isEdit)
  console.log("jobList:", data)
  console.log("selectedDate:", selectedDate)
  document.title = isEdit
    ? "Edit job List | SAIT Job Board"
    : "Create job List  | SAIT Job Board"

  const validatePage = () => {
    jobName === ""
      ? (document.getElementById("jobNameError").style.display = "block")
      : (document.getElementById("jobNameError").style.display = "none")

    selectedDate === null
      ? (document.getElementById("jobDateError").style.display = "block")
      : (document.getElementById("jobDateError").style.display = "none")

    jobNoOfDays === ""
      ? (document.getElementById("JobNoOfDaysError").style.display = "block")
      : (document.getElementById("JobNoOfDaysError").style.display = "none")

    selectedjobWBSOption?.value === "" ||
    selectedjobWBSOption?.value === undefined ||
    selectedjobWBSOption?.value === "undefined"
      ? (document.getElementById("jobWbsError").style.display = "block")
      : (document.getElementById("jobWbsError").style.display = "none")
    selectedJobSiteIdOption?.value === "" ||
    selectedJobSiteIdOption?.value === undefined
      ? (document.getElementById("jobSiteIdError").style.display = "block")
      : (document.getElementById("jobSiteIdError").style.display = "none")

    jobNotes === ""
      ? (document.getElementById("jobNotesError").style.display = "block")
      : (document.getElementById("jobNotesError").style.display = "none")

    if (
      jobName !== "" &&
      selectedDate !== "" &&
      jobNoOfDays !== "" &&
      selectedJobSiteIdOption?.value !== "" &&
      selectedjobWBSOption?.value !== "" &&
      jobNotes !== ""
    ) {
      let data = {
        jobName: jobName,
        jobDate: selectedDate,
        numberOfDays: jobNoOfDays,
        notes: jobNotes,
        jobwbs: selectedjobWBSOption?.value,
        site: selectedJobSiteIdOption?.value,
      }
      let input = { id: id, data: data }
      if (isEdit) {
        console.log("edit")
        console.log("data:", input)
        // dispatch(onUpdateSite(input))
      } else {
        console.log("Add")
        console.log("data:", data)
        dispatch(onAddNewJob(data))
      }
    } else {
      console.log("Check fields")
    }
  }

  const submitData = () => {
    validatePage()
  }

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
                        className="btn btn-dark w-xl h-75 d-flex justify-content-center align-items-center"
                        onClick={handleClick}
                      >
                        Back
                      </button>
                      <button
                        // type="submit"
                        className="btn btn-danger w-xl ms-4 h-75  d-flex justify-content-center align-items-center"
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
                              value={jobName}
                              onChange={e => setJobName(e.target.value)}
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"jobNameError"}
                            >
                              Please Enter Your Job Name
                            </div>
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
                                    selected={selectedDate}
                                    placeholderText="Insert Job Date"
                                    // onChange={date =>
                                    //   handleDateChange("date", date)
                                    // }
                                    onChange={handleDateChange}
                                    // onBlur={validation.handleBlur}
                                    // dateFormat="yyyy-MM-dd"
                                    // showTimeInput
                                    className="form-control"
                                  />
                                  <div
                                    style={{
                                      color: "red",
                                      display: "none",
                                    }}
                                    id={"jobDateError"}
                                  >
                                    Please Enter Your job Date
                                  </div>
                                  {/* {validation.touched.jobDate &&
                                  validation.errors.jobDate ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.jobDate}
                                    </FormFeedback>
                                  ) : null} */}
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
                                      className="form-control"
                                      value={jobNoOfDays}
                                      onChange={e =>
                                        setJobNoOfDays(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div
                                    style={{
                                      color: "red",
                                      display: "none",
                                    }}
                                    id={"JobNoOfDaysError"}
                                  >
                                    Please Enter Job No Of Days
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
                              onChange={handleSelectChange}
                              // onBlur={validation.handleBlur}
                              value={selectedJobSiteIdOption?.value}
                              // invalid={
                              //   validation.touched.JobSiteId &&
                              //   validation.errors.JobSiteId
                              //     ? true
                              //     : false
                              // }
                            >
                              <option value="" disabled selected>
                                Select Job Site Id
                              </option>
                              {sites.map((site, index) => {
                                return (
                                  <option
                                    key={index}
                                    data-job-wbs={`${site?.jobWbs?.id},${site?.jobWbs?.name}`}
                                    value={site?.id}
                                  >
                                    {site.siteId}
                                  </option>
                                )
                              })}
                            </Input>
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"jobSiteIdError"}
                            >
                              Please Select Job Site Id
                            </div>
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
                              style={{ height: "200px" }}
                              value={jobNotes}
                              onChange={e => setJobNotes(e.target.value)}
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"jobNotesError"}
                            >
                              Please Enter Your job Notes
                            </div>
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
                              onChange={handleSelectjobWBSChange}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              value={selectedjobWBSOption?.value}
                            >
                              <option value="" disabled selected>
                                Select JobWBS
                              </option>
                              {jobWbs.map((jobwbs, index) => {
                                return (
                                  <option key={index} value={jobwbs.id}>
                                    {jobwbs.name}
                                  </option>
                                )
                              })}
                            </Input>
                            {/* {validation.touched.JobWBS &&
                            validation.errors.JobWBS ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobWBS}
                              </FormFeedback>
                            ) : null} */}
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"jobWbsError"}
                            >
                              Please Select Your jobWbs
                            </div>
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
                          className="btn btn-success save-user w-25"
                          onClick={submitData}
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
