import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { parseISO } from "date-fns"
import { parse, format } from "date-fns"

import toast from "toastr"
import "toastr/build/toastr.min.css"

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
  updateJob as onUpdateJob,
  fetchJobWbs,
  fetchSites,
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
import { isEmpty } from "lodash"

const TasksCreate = () => {
  const { state } = useLocation()
  const [data, setData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [id, setId] = useState(null)
  const [jobName, setJobName] = useState("")
  const [jobNoOfDays, setJobNoOfDays] = useState("")
  const [jobNotes, setJobNotes] = useState("")

  const [selectedJobSiteIdOption, setSelectedJobSiteIdOption] = useState(null)
  const [selectedjobWBSOption, setSelectedjobWBSOption] = useState(null)
  const inpRow = []
  const [indexNum, setIndexNum] = useState(0)
  const [inputFields, setinputFields] = useState(inpRow)
  const [technicianLimitForEachDay, setTechnicianLimitForEachDay] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (state && state.jobList) {
      setData(state.jobList)
    }
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])

  useEffect(() => {
    setJobNoOfDays(inputFields.length)
  }, [inputFields])

  useEffect(() => {
    if (data && data.id) {
      setId(data.id)
      setJobName(data.jobName)
      setJobNoOfDays(data.numberOfDays)
      setSelectedJobSiteIdOption({
        label: data.site.siteId,
        value: data.site.id,
      })
      setSelectedjobWBSOption({ value: data?.site?.jobWbs })
      setJobNotes(data.notes)
      setinputFields(data?.technicianLimitForEachDay || [])
      console.log("input field:", data.technicianLimitForEachDay)
    }
    if (data && data.jobDate) {
      const parsedDate = new Date(data.jobDate)
      parsedDate.setHours(0, 0, 0, 0) // Set time to 00:00:00
      setSelectedDate(parsedDate)
    }
  }, [data])

  const { isLoading, successAdd, successUpdate, error } = useSelector(
    state => state.JobListReducer
  )
  useEffect(() => {
    if (!isEdit && !isLoading && successAdd) {
      toast.success("Data Added successfully")
      navigate("/joblist")
    }
    if (!isEdit && !isLoading && error) {
      toast.error("Error occurs during adding data")
    }
    if (isEdit && !isLoading && successUpdate) {
      toast.success("Data updated successfully")
      navigate("/joblist")
    }
    if (isEdit && !isLoading && error) {
      toast.error("Error occurs during updating data")
    }
  }, [isEdit, isLoading, successAdd, successUpdate, error])

  useEffect(() => {
    dispatch(fetchJobWbs())
    dispatch(fetchSites())
  }, [dispatch])

  const { jobWbs } = useSelector(state => state.JobWbsReducer)
  const { sites } = useSelector(state => state.SitesReducer)

  console.log("isEdit:", isEdit)
  document.title = isEdit
    ? "Edit job List | SAIT Job Board"
    : "Create job List  | SAIT Job Board"

  // const validatePage = () => {
  //   let value = false
  //   if (jobName === "") {
  //     document.getElementById("jobNameError").style.display = "block"
  //     return false
  //   } else {
  //     document.getElementById("jobNameError").style.display = "none"
  //     value = true
  //   }

  //   if (selectedDate === null) {
  //     document.getElementById("jobDateError").style.display = "block"
  //     return false
  //   } else {
  //     document.getElementById("jobDateError").style.display = "none"
  //     value = true
  //   }
  //   if (inputFields.length === 0) {
  //     document.getElementById("JobNoOfDaysError").style.display = "block"
  //     return false
  //   } else {
  //     document.getElementById("JobNoOfDaysError").style.display = "none"
  //     value = true
  //   }
  //   console.log("inputfield:", inputFields)
  //   inputFields.forEach((field, key) => {
  //     console.log("field:", field)
  //     console.log("key:", key)
  //     console.log("field[key]:", field[key])
  //     if (
  //       field === "" ||
  //       field === undefined ||
  //       field === null ||
  //       field.length === 0
  //     ) {
  //       console.log("field[key]:", field[key])
  //       document.getElementById("JobNoOfDaysError" + key).style.display =
  //         "block"
  //       return false
  //     } else {
  //       document.getElementById("JobNoOfDaysError" + key).style.display = "none"
  //       value = true
  //     }
  //   })

  //   if (
  //     selectedJobSiteIdOption?.value === "" ||
  //     selectedJobSiteIdOption?.value === undefined
  //   ) {
  //     document.getElementById("jobSiteIdError").style.display = "block"
  //     return false
  //   } else {
  //     document.getElementById("jobSiteIdError").style.display = "none"
  //     value = true
  //   }
  //   if (jobNotes === "") {
  //     document.getElementById("jobNotesError").style.display = "block"
  //     return false
  //   } else {
  //     document.getElementById("jobNotesError").style.display = "none"
  //     value = true
  //   }
  //   if (
  //     selectedjobWBSOption?.value === "" ||
  //     selectedjobWBSOption?.value === undefined ||
  //     selectedjobWBSOption?.value === "undefined"
  //   ) {
  //     document.getElementById("jobWbsError").style.display = "block"
  //     return false
  //   } else {
  //     document.getElementById("jobWbsError").style.display = "none"
  //     value = true
  //   }

  //   return value
  // }
  const validatePage = () => {
    let isValid = true

    if (jobName === "") {
      document.getElementById("jobNameError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("jobNameError").style.display = "none"
    }

    if (selectedDate === null) {
      document.getElementById("jobDateError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("jobDateError").style.display = "none"
    }

    if (inputFields.length === 0) {
      document.getElementById("JobNoOfDaysError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("JobNoOfDaysError").style.display = "none"
    }

    inputFields.forEach((field, key) => {
      if (
        field === "" ||
        field === undefined ||
        field === null ||
        field.length === 0
      ) {
        console.log("field[key]:", field[key])
        document.getElementById("JobNoOfDaysError" + key).style.display =
          "block"
        isValid = false
      } else {
        document.getElementById("JobNoOfDaysError" + key).style.display = "none"
      }
    })

    if (
      selectedJobSiteIdOption?.value === "" ||
      selectedJobSiteIdOption?.value === undefined
    ) {
      document.getElementById("jobSiteIdError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("jobSiteIdError").style.display = "none"
    }

    if (jobNotes === "") {
      document.getElementById("jobNotesError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("jobNotesError").style.display = "none"
    }

    if (
      selectedjobWBSOption?.value === "" ||
      selectedjobWBSOption?.value === undefined ||
      selectedjobWBSOption?.value === "undefined"
    ) {
      document.getElementById("jobWbsError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("jobWbsError").style.display = "none"
    }

    return isValid
  }

  const submitData = () => {
    if (validatePage()) {
      let data = {
        jobName: jobName,
        jobDate: selectedDate,
        numberOfDays: jobNoOfDays,
        technicianLimitForEachDay: inputFields,
        notes: jobNotes,
        jobWbs: selectedjobWBSOption?.value,
        site: selectedJobSiteIdOption?.value,
      }
      let input = { id: id, data: data }
      if (isEdit) {
        console.log("edit")
        console.log("edit:", input)
        dispatch(onUpdateJob(input))
      } else {
        console.log("Add")
        console.log("Add:", data)
        dispatch(onAddNewJob(data))
      }
    } else {
      console.log("Check fields")
    }
  }

  function handleClick() {
    navigate("/joblist")
  }

  function handleClearClick() {
    setJobName("")
    setSelectedDate(null)
    setJobNoOfDays("")
    setJobNotes("")
    setinputFields([])
    setSelectedJobSiteIdOption({ value: "" }) // Set select element value to index 0
    setSelectedjobWBSOption({ value: "" }) // Set select element value to index 0
  }

  const handlejobNameChange = e => {
    let value = e.target.value
    setJobName(e.target.value)
    if (value !== "") {
      document.getElementById("jobNameError").style.display = "none"
    }
  }
  const handleDateChange = date => {
    if (date instanceof Date && !isNaN(date)) {
      setSelectedDate(date)
      document.getElementById("jobDateError").style.display = "none"
    }
  }
  const handlejobNoOfDaysChange = e => {
    let value = e.target.value
    setJobNoOfDays(e.target.value)
    if (value !== "") {
      document.getElementById("JobNoOfDaysError").style.display = "none"
    }
  }
  const handleSelectChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedJobSiteIdOption({ label: selectedLabel, value: selectedValue })
    if (selectedValue !== "") {
      document.getElementById("jobSiteIdError").style.display = "none"
    }
    const [jobWbsId, jobWbsName] = e.target.options[e.target.selectedIndex]
      .getAttribute("data-job-wbs")
      .split(",")
    if (jobWbsId != undefined && jobWbsId != "undefined") {
      setSelectedjobWBSOption({ label: jobWbsName, value: jobWbsId })
      document.getElementById("jobWbsError").style.display = "none"
    }
    // else {
    //   setSelectedjobWBSOption({ label: "Select JobWBS", value: "" })
    // }
  }
  const handlejobNotesChange = e => {
    let value = e.target.value
    setJobNotes(e.target.value)
    if (value !== "") {
      document.getElementById("jobNotesError").style.display = "none"
    }
  }
  const handleSelectjobWBSChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedjobWBSOption({ label: selectedLabel, value: selectedValue })
    if (selectedValue !== "" || selectedValue !== undefined) {
      document.getElementById("jobWbsError").style.display = "none"
    }
  }

  function handleInputChange(e, index) {
    // setIndexNum(index + 1)
    const { value } = e.target
    if (value !== "") {
      // let x = { [`day ${index + 1}`]: { value } }
      const fields = [...inputFields]
      fields[index] = value
      setinputFields(fields)
      document.getElementById("JobNoOfDaysError" + index).style.display = "none"

      // let updatedTechnicianLimit = { ...technicianLimitForEachDay } // Make a copy of the existing object
      // updatedTechnicianLimit[`day${index + 1}`] = value // Add or update the value for the specific day
      // setTechnicianLimitForEachDay(updatedTechnicianLimit)
    }
  }

  function handleRemoveFields(idx) {
    const fields = [...inputFields]
    fields.splice(idx, 1)
    setinputFields(fields)
  }

  function handleAddFields() {
    // setIndexNum(indexNum + 1)
    const fields = [...inputFields]
    if (indexNum > 0 && !fields[indexNum]) {
      document.getElementById("JobNoOfDaysError").style.display = "block"
      document.getElementById("addButton").disabled = true
    } else {
      document.getElementById("JobNoOfDaysError").style.display = "none"
      document.getElementById("addButton").disabled = false
      const item1 = []
      setinputFields([...inputFields, item1])
    }
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
                        onClick={handleClearClick}
                      >
                        Clear
                      </button>
                    </Col>
                  </Row>

                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <Row>
                          <Col className="col-12">
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
                                  onChange={handlejobNameChange}
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
                            <div className="inner-repeater mb-3">
                              <div className="inner form-group mb-0 row">
                                <Label className="col-form-label col-lg-2">
                                  Job Date
                                </Label>
                                <div
                                  className="inner col-lg-10 ml-md-auto"
                                  id="repeater"
                                >
                                  <div className="mb-3 row align-items-center">
                                    <Col md="5">
                                      <DatePicker
                                        id="jobDate"
                                        name="jobDate"
                                        selected={selectedDate}
                                        placeholderText="Insert Job Date"
                                        onChange={handleDateChange}
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
                                    </Col>
                                    <Col md="2">
                                      <Label>Job Site Id</Label>
                                    </Col>
                                    <Col md="5">
                                      <Input
                                        name="JobSiteId"
                                        type="select"
                                        className="form-select"
                                        placeholder="Insert Job Site Id"
                                        onChange={handleSelectChange}
                                        value={selectedJobSiteIdOption?.value}
                                      >
                                        <option value="" disabled selected>
                                          Select Job Site Id
                                        </option>
                                        {sites &&
                                          sites.sites &&
                                          sites.sites.map((site, index) => {
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
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="inner-repeater mb-4">
                              <div className="inner form-group row">
                                <Label className="col-form-label col-lg-2">
                                  Job No of Days
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
                                      <Col md="4">
                                        <Label>
                                          Add No of Technicians for Day{" "}
                                          {key + 1}
                                        </Label>
                                      </Col>
                                      <Col md="5">
                                        <Input
                                          name="JobNoOfDays"
                                          placeholder={`Insert number of Technicians for day ${
                                            key + 1
                                          }`}
                                          type="number"
                                          className="form-control"
                                          value={field}
                                          onChange={e =>
                                            handleInputChange(e, key)
                                          }
                                        />
                                        <div
                                          style={{
                                            color: "red",
                                            display: "none",
                                          }}
                                          id={"JobNoOfDaysError" + key}
                                        >
                                          Please Enter Job number Of Days
                                        </div>
                                      </Col>
                                      <Col md="3">
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
                                  <Col md="3">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <h5>
                                        <b>
                                          Total number of days:{" "}
                                          {inputFields.length}
                                          {/* {setJobNoOfDays(inputFields.length)} */}
                                        </b>
                                      </h5>
                                      <Button
                                        id="addButton"
                                        color="primary"
                                        className="inner"
                                        onClick={handleAddFields}
                                        // style={{ width: 100 }}
                                        block
                                      >
                                        Add
                                      </Button>
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
                              </div>
                            </div>

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
                                  onChange={handlejobNotesChange}
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
                                  {jobWbs && jobWbs.jobWbs ? (
                                    jobWbs.jobWbs.map((jobwbsData, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={jobwbsData.id}
                                        >
                                          {jobwbsData.name}
                                        </option>
                                      )
                                    })
                                  ) : (
                                    <option value="">
                                      No jobWbs available
                                    </option>
                                  )}
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
                          </Col>
                        </Row>
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
