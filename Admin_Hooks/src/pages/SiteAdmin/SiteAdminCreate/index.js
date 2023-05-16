import React, { useState, useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"
import { userTypes } from "pages/Authentication/userTypes"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
import toast from "toastr"
import "toastr/build/toastr.min.css"
// toast.configure()
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Button,
} from "reactstrap"

import * as Yup from "yup"
import { useFormik } from "formik"
// Import Editor
// import { Editor } from "react-draft-wysiwyg"
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import {
  addNewSite as onAddNewSite,
  updateSite as onUpdateSite,
  fetchJobWbs,
  fetchCompany,
  fetchSite,
} from "store/actions"
// redux
import { useSelector, useDispatch } from "react-redux"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { submit } from "redux-form"
const userType = localStorage.getItem("userType")
const TasksCreate = () => {
  const { state } = useLocation()
  const [isEdit, setIsEdit] = useState(false)
  // const [isSuccess, setIsSuccess] = useState(null)
  const [id, setId] = useState("")
  const [siteDate, setSiteDate] = useState("")
  const [siteId, setSiteId] = useState("")
  const [building, setBuilding] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [city, setCity] = useState("")
  const [stateData, setStateData] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [timezone, setTimeZone] = useState("")

  const [selectedCompanyOption, setSelectedCompanyOption] = useState(null)
  const [selectedjobWBSOption, setSelectedjobWBSOption] = useState(null)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   setIsSuccess(success)
  // }, [success])

  useEffect(() => {
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])

  useEffect(() => {
    if (state && state.canEdit && state.sites) {
      dispatch(fetchSite(state.sites))
    }
  }, [state])

  const { site, isLoading, success, error } = useSelector(
    state => state.SitesReducer
  )

  // console.log("sites:", site)
  // console.log("isLoading:", isLoading)
  // console.log("success:", success)
  // console.log("error:", error)

  useEffect(() => {
    dispatch(fetchJobWbs())
    dispatch(fetchCompany())
  }, [])

  useEffect(() => {
    if (state && state.canEdit) {
      setSiteDate(site)
      setId(site.id)
      setSiteId(site.siteId)
      setBuilding(site.building)
      setAddressLine1(site.addressLine1)
      setAddressLine2(site.addressLine2)
      setSelectedjobWBSOption({
        label: site.jobWbs?.name,
        value: site.jobWbs?.id,
      })
      setSelectedCompanyOption({
        label: site.company?.name,
        value: site.company?.id,
      })
      setCity(site.city)
      setStateData(site.state)
      setZipcode(site.zipcode)
      setTimeZone(site.timezone)
    }
  }, [state, site])

  const { jobWbs } = useSelector(state => state.JobWbsReducer)
  const { company } = useSelector(state => state.CompanyReducer)
  // console.log("site List:", data)
  // console.log("jobWbs List:", jobWbs)

  document.title = isEdit
    ? "Edit Site Admin | SAIT Job Board"
    : "Create Site Admin  | SAIT Job Board"

  const inpRow = [{ name: "", file: "" }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)

  const handleSelectjobWBSChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedjobWBSOption({ label: selectedLabel, value: selectedValue })
  }

  const handleSelectChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedCompanyOption({ label: selectedLabel, value: selectedValue })
  }
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

  const validatePage = () => {
    siteId === ""
      ? (document.getElementById("SiteIdError").style.display = "block")
      : (document.getElementById("SiteIdError").style.display = "none")

    building === ""
      ? (document.getElementById("BuildingError").style.display = "block")
      : (document.getElementById("BuildingError").style.display = "none")

    addressLine1 === ""
      ? (document.getElementById("AddressLine1Error").style.display = "block")
      : (document.getElementById("AddressLine1Error").style.display = "none")
    addressLine2 === ""
      ? (document.getElementById("AddressLine2Error").style.display = "block")
      : (document.getElementById("AddressLine2Error").style.display = "none")

    selectedjobWBSOption?.value === ""
      ? (document.getElementById("jobWbsError").style.display = "block")
      : (document.getElementById("jobWbsError").style.display = "none")
    selectedCompanyOption?.value === ""
      ? (document.getElementById("CompanyError").style.display = "block")
      : (document.getElementById("CompanyError").style.display = "none")

    city === ""
      ? (document.getElementById("CityError").style.display = "block")
      : (document.getElementById("CityError").style.display = "none")

    stateData === ""
      ? (document.getElementById("StateError").style.display = "block")
      : (document.getElementById("StateError").style.display = "none")

    zipcode === ""
      ? (document.getElementById("ZipcodeError").style.display = "block")
      : (document.getElementById("ZipcodeError").style.display = "none")

    timezone === ""
      ? (document.getElementById("TimeZoneError").style.display = "block")
      : (document.getElementById("TimeZoneError").style.display = "none")

    if (
      siteId !== "" &&
      building !== "" &&
      addressLine1 !== "" &&
      addressLine2 !== "" &&
      selectedCompanyOption?.value !== "" &&
      selectedjobWBSOption?.value !== "" &&
      city !== "" &&
      stateData !== "" &&
      zipcode !== "" &&
      timezone !== ""
    ) {
      let data = {
        siteId: siteId,
        building: building,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: stateData,
        zipcode: zipcode,
        jobWbs: selectedjobWBSOption?.value,
        timezone: timezone,
        company: selectedCompanyOption?.value,
      }
      let input = { id: id, data: data }
      if (isEdit) {
        dispatch(onUpdateSite(input))
      } else {
        dispatch(onAddNewSite(data))
      }
    } else {
      console.log("Check fields")
    }
  }
  useEffect(() => {
    if (!isLoading && success) {
      toast.success("Data added successfully")
      navigate("/siteadmin")
    }
    if (!isLoading && error) {
      toast.error("Error occurs during adding data")
    }
  }, [isLoading, success, error])
  // console.log("success:", isSuccess)
  const submitData = () => {
    validatePage()
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
                      className="mx-1 d-flex justify-content-end"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <button
                        // type="submit"
                        className="btn btn-dark w-xl h-75 d-flex justify-content-center align-items-center"
                        onClick={handleBackClick}
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

                  <Form className="outer-repeater">
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
                              value={siteId}
                              onChange={e => setSiteId(e.target.value)}
                              // validate={{
                              //   required: { value: true },
                              // }}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              // value={validation.values.SiteId || ""}
                              // invalid={
                              //   validation.touched.SiteId &&
                              //   validation.errors.SiteId
                              //     ? true
                              //     : false
                              // }
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"SiteIdError"}
                            >
                              Please Enter Your Site ID
                            </div>
                            {/* {validation.touched.SiteId &&
                            validation.errors.SiteId ? (
                              <FormFeedback type="invalid">
                                {validation.errors.SiteId}
                              </FormFeedback>
                            ) : null} */}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="Building"
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
                              value={building}
                              onChange={e => setBuilding(e.target.value)}
                              // validate={{
                              //   required: { value: true },
                              // }}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              // value={validation.values.Building || ""}
                              // invalid={
                              //   validation.touched.Building &&
                              //   validation.errors.Building
                              //     ? true
                              //     : false
                              // }
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"BuildingError"}
                            >
                              Please Enter Your Building Name
                            </div>
                            {/* {validation.touched.Building &&
                            validation.errors.Building ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Building}
                              </FormFeedback>
                            ) : null} */}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="AddressLine1"
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
                              value={addressLine1}
                              onChange={e => setAddressLine1(e.target.value)}
                              // validate={{
                              //   required: { value: true },
                              // }}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              // value={validation.values.AddressLine1 || ""}
                              // invalid={
                              //   validation.touched.AddressLine1 &&
                              //   validation.errors.AddressLine1
                              //     ? true
                              //     : false
                              // }
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"AddressLine1Error"}
                            >
                              Please Enter Your Address Line 1
                            </div>
                            {/* {validation.touched.AddressLine1 &&
                            validation.errors.AddressLine1 ? (
                              <FormFeedback type="invalid">
                                {validation.errors.AddressLine1}
                              </FormFeedback>
                            ) : null} */}
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
                              value={addressLine2}
                              onChange={e => setAddressLine2(e.target.value)}
                              // validate={{
                              //   required: { value: true },
                              // }}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              // value={validation.values.AddressLine2 || ""}
                              // invalid={
                              //   validation.touched.AddressLine2 &&
                              //   validation.errors.AddressLine2
                              //     ? true
                              //     : false
                              // }
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"AddressLine2Error"}
                            >
                              Please Enter Your Address Line 2
                            </div>
                            {/* {validation.touched.AddressLine2 &&
                            validation.errors.Building ? (
                              <FormFeedback type="invalid">
                                {validation.errors.AddressLine2}
                              </FormFeedback>
                            ) : null} */}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="Company"
                            className="col-form-label col-lg-2"
                          >
                            JobWBS
                          </Label>
                          <Col lg="10">
                            {/* {console.log(validation.values.Company)} */}
                            <Input
                              name="jobWbs"
                              type="select"
                              className="form-select"
                              placeholder="Select jobWbs"
                              value={selectedjobWBSOption?.value}
                              // value={selectedjobWbs}
                              onChange={handleSelectjobWBSChange}
                              // onChange={e => setSelectedjobWbs(e.target.value)}
                              // onChange={e => jobWbsFunc(e)}
                              // value={selectedOption}
                              // onChange={handleSelectChange}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              // value={validation.values.Company}
                              // invalid={
                              //   validation.touched.Company &&
                              //   validation.errors.Company
                              //     ? true
                              //     : false
                              // }
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
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"jobWbsError"}
                            >
                              Please Select Your jobWbs
                            </div>
                            {/* {validation.touched.Company &&
                            validation.errors.Company ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Company}
                              </FormFeedback>
                            ) : null} */}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="Company"
                            className="col-form-label col-lg-2"
                          >
                            Company
                          </Label>
                          <Col lg="10">
                            {/* {console.log(validation.values.Company)} */}
                            <Input
                              name="Company"
                              type="select"
                              className="form-select"
                              placeholder="Select Company"
                              // value={selectedCompany}
                              // onChange={e => CompanyFunc(e)}
                              value={selectedCompanyOption?.value}
                              // value={selectedOption}
                              onChange={handleSelectChange}
                              // onChange={e => setSelectedCompany(e.target.value)}
                              // onChange={handleSelectChange}
                              // onChange={validation.handleChange}
                              // onBlur={validation.handleBlur}
                              // value={validation.values.Company}
                              // invalid={
                              //   validation.touched.Company &&
                              //   validation.errors.Company
                              //     ? true
                              //     : false
                              // }
                            >
                              <option value="" disabled selected>
                                Select Company
                              </option>
                              {company.map((comp, index) => {
                                return (
                                  <option key={index} value={comp.id}>
                                    {comp.name}
                                  </option>
                                )
                              })}
                            </Input>
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"CompanyError"}
                            >
                              Please Select Your Company
                            </div>
                            {/* {validation.touched.Company &&
                            validation.errors.Company ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Company}
                              </FormFeedback>
                            ) : null} */}
                          </Col>
                        </FormGroup>
                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label
                              htmlFor="City"
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
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    // validate={{
                                    //   required: { value: true },
                                    // }}
                                    // onChange={validation.handleChange}
                                    // onBlur={validation.handleBlur}
                                    // value={validation.values.City || ""}
                                    // invalid={
                                    //   validation.touched.City &&
                                    //   validation.errors.City
                                    //     ? true
                                    //     : false
                                    // }
                                  />
                                  <div
                                    style={{
                                      color: "red",
                                      display: "none",
                                    }}
                                    id={"CityError"}
                                  >
                                    Please Enter Your Job City
                                  </div>
                                  {/* {validation.touched.City &&
                                  validation.errors.City ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.City}
                                    </FormFeedback>
                                  ) : null} */}
                                </Col>
                                <Col md="2">
                                  <Label
                                    htmlFor="State"
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
                                    value={stateData}
                                    onChange={e => setStateData(e.target.value)}
                                    // validate={{
                                    //   required: { value: true },
                                    // }}
                                    // onChange={validation.handleChange}
                                    // onBlur={validation.handleBlur}
                                    // value={validation.values.State || ""}
                                    // invalid={
                                    //   validation.touched.State &&
                                    //   validation.errors.State
                                    //     ? true
                                    //     : false
                                    // }
                                  />
                                  <div
                                    style={{
                                      color: "red",
                                      display: "none",
                                    }}
                                    id={"StateError"}
                                  >
                                    Please Enter Your Job State
                                  </div>
                                  {/* {validation.touched.State &&
                                  validation.errors.State ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.State}
                                    </FormFeedback>
                                  ) : null} */}
                                </Col>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label
                              htmlFor="Zipcode"
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
                                    value={zipcode}
                                    onChange={e => setZipcode(e.target.value)}
                                    // validate={{
                                    //   required: { value: true },
                                    // }}
                                    // onChange={validation.handleChange}
                                    // onBlur={validation.handleBlur}
                                    // value={validation.values.Zipcode || ""}
                                    // invalid={
                                    //   validation.touched.Zipcode &&
                                    //   validation.errors.Zipcode
                                    //     ? true
                                    //     : false
                                    // }
                                  />
                                  <div
                                    style={{
                                      color: "red",
                                      display: "none",
                                    }}
                                    id={"ZipcodeError"}
                                  >
                                    Please Enter Your Zip Code
                                  </div>
                                  {/* {validation.touched.Zipcode &&
                              validation.errors.Zipcode ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.Zipcode}
                                </FormFeedback>
                              ) : null} */}
                                </Col>
                                <Col md="2">
                                  <Label
                                    htmlFor="TimeZone"
                                    // className="col-form-label col-lg-2"
                                  >
                                    TimeZone
                                  </Label>
                                </Col>
                                <Col md="5">
                                  <Input
                                    id="Timezone"
                                    name="Timezone"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Time Zone..."
                                    value={timezone}
                                    onChange={e => setTimeZone(e.target.value)}
                                    // validate={{
                                    //   required: { value: true },
                                    // }}
                                    // onChange={validation.handleChange}
                                    // onBlur={validation.handleBlur}
                                    // value={validation.values.Timezone || ""}
                                    // invalid={
                                    //   validation.touched.Timezone &&
                                    //   validation.errors.Timezone
                                    //     ? true
                                    //     : false
                                    // }
                                  />
                                  <div
                                    style={{
                                      color: "red",
                                      display: "none",
                                    }}
                                    id={"TimeZoneError"}
                                  >
                                    Please Enter Your Time Zone
                                  </div>
                                  {/* {validation.touched.Timezone &&
                              validation.errors.Timezone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.Timezone}
                                </FormFeedback>
                              ) : null} */}
                                </Col>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Row style={{ padding: 0, margin: 0 }}>
                      {/* <Col lg="7"></Col> */}
                      {/* <Col lg="2" className="mx-1" style={{ padding: 0 }}> */}
                      <Col className="mx-1">
                        <div className="text-end">
                          <Button
                            type="button"
                            className="btn btn-success save-user w-25"
                            onClick={submitData}
                          >
                            {!!isEdit ? "Update" : "Create"}
                          </Button>
                        </div>
                      </Col>
                      {/* </Row> */}
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
