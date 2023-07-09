import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

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
  Label,
  Button,
} from "reactstrap"

import {
  addNewJob as onAddNewJob,
  updateJob as onUpdateJob,
  fetchJobWbs,
  fetchSites,
  fetchCompany,
} from "store/actions"

import Editor from "react-simple-wysiwyg"

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
  const [jobNoOfDays, setJobNoOfDays] = useState("")
  const [jobNotes, setJobNotes] = useState("")
  const [selectedCompanyIdOption, setSelectedCompanyIdOption] = useState(null)

  const [selectedJobSiteIdOption, setSelectedJobSiteIdOption] = useState(null)
  const [selectedjobWBSOption, setSelectedjobWBSOption] = useState(null)
  const inpRow = []
  const [inputFields, setinputFields] = useState(inpRow)
  const [companyData, setCompanyData] = useState("")
  const [siteIdData, setSiteIdData] = useState("")

  const [selectedDates, setSelectedDates] = useState([])
  const currentDate = new Date()
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
      setSelectedCompanyIdOption({
        label: data?.site?.company?.name,
        value: data?.site?.company?.id,
      })
      setSelectedJobSiteIdOption({
        label: data.site.siteId,
        value: data.site.id,
      })
      setSelectedjobWBSOption({ value: data?.site?.jobWbs })
      setJobNotes(data.notes)
      setinputFields(data?.technicianLimitForEachDay || [])
      setSelectedDates(data?.technicianLimitForEachDayDate || [])
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
    dispatch(fetchCompany())
  }, [dispatch])

  const { jobWbs } = useSelector(state => state.JobWbsReducer)
  const { sites } = useSelector(state => state.SitesReducer)
  const { company } = useSelector(state => state.CompanyReducer)

  useEffect(() => {
    if (company.company) {
      setCompanyData(company.company)
    }
  }, [company])

  useEffect(() => {
    if (sites.sites) {
      setSiteIdData(sites.sites)
    }
  }, [sites])

  console.log("isEdit:", isEdit)
  document.title = isEdit
    ? "Edit job List | SAIT Job Board"
    : "Create job List  | SAIT Job Board"

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
        document.getElementById("JobNoOfDaysError" + key).style.display =
          "block"
        isValid = false
      } else {
        document.getElementById("JobNoOfDaysError" + key).style.display = "none"
      }
    })

    if (
      selectedCompanyIdOption?.value === "" ||
      selectedCompanyIdOption?.value === undefined
    ) {
      document.getElementById("companyError").style.display = "block"
      isValid = false
    } else {
      document.getElementById("companyError").style.display = "none"
    }

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
        technicianLimitForEachDayDate: selectedDates,
        notes: jobNotes,
        company: selectedCompanyIdOption?.value,
        jobWbs: selectedjobWBSOption?.value,
        site: selectedJobSiteIdOption?.value,
      }
      let input = { id: id, data: data }
      if (isEdit) {
        console.log("edit")
        dispatch(onUpdateJob(input))
      } else {
        console.log("Add")
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
    setJobNoOfDays("")
    setJobNotes("")
    setinputFields([])
    setCompanyData("")
    setSiteIdData("")
    setSelectedCompanyIdOption({ value: "" })
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

  const handleDateChangeNested = (date, index) => {
    if (date instanceof Date && !isNaN(date)) {
      // setSelectedDate(date)
      setSelectedDates(prevDates => {
        const updatedDates = [...prevDates]
        updatedDates[index] = date
        return updatedDates
      })
      document.getElementById("jobDateError" + index).style.display = "none"
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
  }

  const handleSelectCompanyChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedCompanyIdOption({ label: selectedLabel, value: selectedValue })
    if (selectedValue !== "") {
      document.getElementById("companyError").style.display = "none"
    }
    dispatch(fetchSites("", "", "", "", "", "", "", selectedValue, "", ""))
    dispatch(fetchJobWbs())
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
    }
  }

  function handleRemoveFields(idx) {
    const fields = [...inputFields]
    fields.splice(idx, 1)
    setinputFields(fields)

    setSelectedDates(prevDates => {
      const updatedDates = [...prevDates]
      updatedDates.splice(idx, 1)

      // Update the remaining dates to ensure consecutive values
      for (let i = idx; i < updatedDates.length; i++) {
        const date = new Date(updatedDates[i])
        date.setDate(date.getDate() - 1)
        updatedDates[i] = date
      }

      return updatedDates
    })
  }

  function handleAddFields() {
    if (selectedDate) {
      document.getElementById("jobDateError").style.display = "none"

      const fields = [...inputFields]
      if (indexNum > 0 && !fields[indexNum]) {
        document.getElementById("JobNoOfDaysError").style.display = "block"
        document.getElementById("addButton").disabled = true
      } else {
        document.getElementById("JobNoOfDaysError").style.display = "none"
        document.getElementById("addButton").disabled = false
        const item1 = []
        setinputFields([...inputFields, item1])
        // const newDate = new Date(selectedDate) // Create a new Date object
        const newDate =
          selectedDates.length > 0
            ? new Date(selectedDates[selectedDates.length - 1])
            : new Date(selectedDate)

        if (selectedDates.length > 0) {
          newDate.setDate(newDate.getDate() + 1)
        }

        setSelectedDates(prevDates => [...prevDates, newDate])
        setinputFields([...inputFields, []])
      }
    } else {
      document.getElementById("jobDateError").style.display = "block"
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
                                  Company
                                </Label>
                                <div
                                  className="inner col-lg-10 ml-md-auto"
                                  id="repeater"
                                >
                                  <div className="mb-3 row align-items-center">
                                    <Col md="5">
                                      <Input
                                        name="JobSiteId"
                                        type="select"
                                        className="form-select"
                                        placeholder="Insert Company"
                                        onChange={handleSelectCompanyChange}
                                        value={selectedCompanyIdOption?.value}
                                      >
                                        <option value="" disabled selected>
                                          Select Company
                                        </option>
                                        {Array.isArray(companyData) &&
                                          companyData.map((comp, index) => (
                                            <option key={index} value={comp.id}>
                                              {comp.name}
                                            </option>
                                          ))}
                                      </Input>
                                      <div
                                        style={{
                                          color: "red",
                                          display: "none",
                                        }}
                                        id={"companyError"}
                                      >
                                        Please Select Company
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
                                          Select Site Id
                                        </option>
                                        {siteIdData &&
                                          siteIdData.map((site, index) => {
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
                                        minDate={currentDate}
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
                                      <Label>Job WBS</Label>
                                    </Col>
                                    <Col md="5">
                                      <Input
                                        name="JobWBS"
                                        type="select"
                                        className="form-select"
                                        onChange={handleSelectjobWBSChange}
                                        value={selectedjobWBSOption?.value}
                                      >
                                        <option value="" disabled selected>
                                          Select JobWBS
                                        </option>
                                        {jobWbs && jobWbs.jobWbs ? (
                                          jobWbs.jobWbs.map(
                                            (jobwbsData, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={jobwbsData.id}
                                                >
                                                  {jobwbsData.name}
                                                </option>
                                              )
                                            }
                                          )
                                        ) : (
                                          <option value="">
                                            No jobWbs available
                                          </option>
                                        )}
                                      </Input>
                                      <div
                                        style={{
                                          color: "red",
                                          display: "none",
                                        }}
                                        id={"jobWbsError"}
                                      >
                                        Job WBS is Missing
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
                                      <Col md="2">
                                        <Label>
                                          Add Technician limit for Day {key + 1}
                                        </Label>
                                      </Col>
                                      <Col md="4">
                                        <DatePicker
                                          id={"jobDate" + key}
                                          name="jobDate"
                                          selected={
                                            new Date(selectedDates[key])
                                          }
                                          placeholderText="Insert Job Date"
                                          onChange={date =>
                                            handleDateChangeNested(date, key)
                                          }
                                          className="form-control"
                                          disabled
                                        />
                                        <div
                                          style={{
                                            color: "red",
                                            display: "none",
                                          }}
                                          id={"jobDateError" + key}
                                        >
                                          Date for Day {key + 1} is missing
                                        </div>
                                      </Col>
                                      <Col md="4">
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
                                <Editor
                                  id="JobNotes"
                                  name="JobNotes"
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
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </form>
                  <Row style={{ padding: 0, margin: 0 }}>
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
