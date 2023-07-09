import React, { useState, useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"
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
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap"

import {
  addNewSite as onAddNewSite,
  updateSite as onUpdateSite,
  fetchJobWbs,
  fetchCompany,
  fetchSite,
} from "store/actions"
// redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
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
  const [latitude, setLatitude] = useState(null)
  const [longitute, setLongitute] = useState(null)
  const [city, setCity] = useState("")
  const [stateData, setStateData] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [timezone, setTimeZone] = useState("")
  const [companyData, setCompanyData] = useState("")
  const [selectedCompanyOption, setSelectedCompanyOption] = useState(null)
  const [selectedjobWBSOption, setSelectedjobWBSOption] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      // setAddressLine2(site.addressLine2)
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

  useEffect(() => {
    if (company.company) {
      setCompanyData(company.company)
    }
  }, [company])

  document.title = isEdit
    ? "Edit Site Admin | SAIT Job Board"
    : "Create Site Admin  | SAIT Job Board"

  function handleBackClick() {
    navigate("/siteadmin")
  }

  function handleClearClick() {
    setSiteId("")
    setBuilding("")
    setAddressLine1("")
    setCity("")
    setStateData("")
    setZipcode("")
    setTimeZone("")
    setSelectedCompanyOption({ value: "" })
    setSelectedjobWBSOption({ value: "" })
  }

  useEffect(() => {
    if (!isEdit && !isLoading && success) {
      toast.success("Data Added successfully")
      navigate("/siteadmin")
    }
    if (!isEdit && !isLoading && error) {
      toast.error("Error occurs during adding data")
    }
    if (isEdit && !isLoading && success) {
      toast.success("Data updated successfully")
      navigate("/siteadmin")
    }
    if (isEdit && !isLoading && error) {
      toast.error("Error occurs during updating data")
    }
  }, [isEdit, isLoading, success, error])
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
    // addressLine2 === ""
    //   ? (document.getElementById("AddressLine2Error").style.display = "block")
    //   : (document.getElementById("AddressLine2Error").style.display = "none")

    selectedjobWBSOption?.value === "" ||
    selectedjobWBSOption?.value === undefined
      ? (document.getElementById("jobWbsError").style.display = "block")
      : (document.getElementById("jobWbsError").style.display = "none")
    selectedCompanyOption?.value === "" ||
    selectedCompanyOption?.value === undefined
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
      // addressLine2 !== "" &&
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
        latitude: latitude,
        longitute: longitute,
        // addressLine2: addressLine2 || "N/A",
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
  // console.log("success:", isSuccess)
  const submitData = () => {
    validatePage()
  }

  const handleSiteIdChange = e => {
    let value = e.target.value
    setSiteId(e.target.value)
    if (value !== "") {
      document.getElementById("SiteIdError").style.display = "none"
    }
  }
  const handleBuildingChange = e => {
    let value = e.target.value
    setBuilding(e.target.value)
    if (value !== "") {
      document.getElementById("BuildingError").style.display = "none"
    }
  }
  const handleAddressLine1Change = e => {
    let value = e.target.value
    setAddressLine1(value)
    if (value !== "") {
      document.getElementById("AddressLine1Error").style.display = "none"
    }
    if (value === "") {
      setCity("")
      setZipcode("")
      setStateData("")
    }
  }

  const handlePlaceSelect = () => {
    const input = document.getElementById("address-input")
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["address"],
      fields: ["formatted_address", "address_components", "geometry"],
    })

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      setAddressLine1(place.formatted_address)

      // Check if the Google Maps API is ready and loaded
      if (window.google && window.google.maps) {
        const { geometry } = place
        const { lat, lng } = geometry.location
        setLatitude(lat())
        setLongitute(lng())
      }

      const { address_components } = place
      let fullAddress = ""
      for (const component of address_components) {
        fullAddress += component.long_name + ", "
      }
      fullAddress = fullAddress.slice(0, -2) // Remove the last comma and space

      setAddressLine1(fullAddress)

      const cityObj = address_components.find(component =>
        component.types.includes("locality")
      )
      const zipcodeObj = address_components.find(component =>
        component.types.includes("postal_code")
      )
      const stateObj = address_components.find(component =>
        component.types.includes("administrative_area_level_1")
      )

      if (cityObj) setCity(cityObj.long_name)
      if (zipcodeObj) {
        setZipcode(zipcodeObj.long_name)
        retrieveTimezone(zipcodeObj.long_name) // Call function to retrieve timezone
      }
      if (stateObj) setStateData(stateObj.long_name)
    })
  }
  const retrieveTimezone = zipcode => {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ address: zipcode }, (results, status) => {
      if (status === "OK") {
        if (results.length > 0) {
          const result = results[0]
          const timezone = result.timeZoneId
          setTimeZone(timezone) // Set the timezone state variable
        }
      } else if (status === "ZERO_RESULTS") {
        console.log("No results found for the given address.")
      } else if (status === "OVER_QUERY_LIMIT") {
        console.log("The request quota for the geocoder has been exceeded.")
      } else if (status === "REQUEST_DENIED") {
        console.log("The geocoder request has been denied.")
      } else if (status === "INVALID_REQUEST") {
        console.log("The geocoder request is invalid.")
      } else {
        console.error("Geocode request failed. Status:", status)
      }
    })
  }

  const handleAddressLine2Change = e => {
    let value = e.target.value
    setAddressLine2(e.target.value)
    if (value !== "") {
      document.getElementById("AddressLine2Error").style.display = "none"
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
  const handleSelectChange = e => {
    const selectedValue = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedCompanyOption({ label: selectedLabel, value: selectedValue })
    if (selectedValue !== "" || selectedValue !== undefined) {
      document.getElementById("CompanyError").style.display = "none"
    }
  }
  const handleCityChange = e => {
    let value = e.target.value
    setCity(value)
    if (value !== "") {
      document.getElementById("CityError").style.display = "none"
    }
  }
  const handleStateChange = e => {
    let value = e.target.value
    setStateData(value)
    if (value !== "") {
      document.getElementById("StateError").style.display = "none"
    }
  }
  const handleZipcodeChange = e => {
    // let value = e.target.value
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/\D/g, "") // Remove non-digit characters
    const value = numericValue.slice(0, 5) // Limit to 5 digits
    setZipcode(value)
    if (value !== "") {
      document.getElementById("ZipcodeError").style.display = "none"
    }
  }
  const handleTimeZoneChange = e => {
    let value = e.target.value
    setTimeZone(value)
    if (value !== "") {
      document.getElementById("TimeZoneError").style.display = "none"
    }
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
                        onClick={handleClearClick}
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
                              onChange={handleSiteIdChange}
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
                              onChange={handleBuildingChange}
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
                              type="text"
                              id="address-input"
                              placeholder="Enter Address..."
                              onChange={handleAddressLine1Change}
                              value={addressLine1}
                              onFocus={handlePlaceSelect}
                            />
                            <div
                              style={{ color: "red", display: "none" }}
                              id="AddressLine1Error"
                            >
                              Please Enter Your Address Line 1
                            </div>
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
                            <Input
                              name="jobWbs"
                              type="select"
                              className="form-select"
                              placeholder="Select jobWbs"
                              value={selectedjobWBSOption?.value}
                              onChange={handleSelectjobWBSChange}
                            >
                              <option value="" disabled selected>
                                Select JobWBS
                              </option>
                              {jobWbs && jobWbs.jobWbs ? (
                                jobWbs.jobWbs.map((jobwbsData, index) => {
                                  return (
                                    <option key={index} value={jobwbsData.id}>
                                      {jobwbsData.name}
                                    </option>
                                  )
                                })
                              ) : (
                                <option value="">No jobWbs available</option>
                              )}
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
                            <Input
                              name="Company"
                              type="select"
                              className="form-select"
                              placeholder="Select Company"
                              value={selectedCompanyOption?.value}
                              onChange={handleSelectChange}
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
                              id={"CompanyError"}
                            >
                              Please Select Your Company
                            </div>
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
                                    onChange={handleCityChange}
                                    // readOnly={city !== "" && !isEdit}
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
                                </Col>
                                <Col md="2">
                                  <Label htmlFor="State">State</Label>
                                </Col>
                                <Col md="5">
                                  <Input
                                    id="State"
                                    name="State"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter State name..."
                                    value={stateData}
                                    onChange={handleStateChange}
                                    // readOnly={stateData !== "" && !isEdit}
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
                                    onChange={handleZipcodeChange}
                                    // readOnly={zipcode !== "" && !isEdit}
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
                                    onChange={handleTimeZoneChange}
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
