import React, { useState } from "react"
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
          <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New Job</CardTitle>
                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <Row>
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
                          <Row>
                            <FormGroup className="mb-4" row>
                              <Label className="col-form-label col-lg-2">
                                Job Date
                              </Label>
                              <Col lg="10">
                                <Row>
                                  <Col
                                    md={5}
                                    className="pr-0"
                                    style={{ paddingLeft: "15px" }}
                                  >
                                    <DatePicker
                                      name="JobDate"
                                      selected={validation.values.JobDate}
                                      placeholderText="Insert Job Date"
                                      onChange={date =>
                                        validation.setFieldValue(
                                          "JobDate",
                                          date
                                        )
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

                                  <Label className="col-form-label col-lg-2">
                                    Job Date
                                  </Label>
                                  <Col
                                    md={5}
                                    className="pr-0"
                                    // style={{ paddingLeft: "55px" }}
                                  >
                                    <DatePicker
                                      name="JobDate"
                                      selected={validation.values.JobDate}
                                      placeholderText="Insert Job Date"
                                      onChange={date =>
                                        validation.setFieldValue(
                                          "JobDate",
                                          date
                                        )
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
                                </Row>
                              </Col>
                            </FormGroup>
                          </Row>

                          {/* <div className="mb-3">
                                            <Label className="form-label"> Job Date</Label>
                                            <Input
                                                name="JobDate"
                                                type="datetime"
                                                placeholder="Insert Job Date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.JobDate || ""}
                                                invalid={
                                                    validation.touched.JobDate && validation.errors.JobDate ? true : false
                                                }
                                            />
                                            {validation.touched.JobDate && validation.errors.JobDate ? (
                                                <FormFeedback type="invalid">{validation.errors.JobDate}</FormFeedback>
                                            ) : null}
                                        </div> */}
                          <div className="mb-3">
                            <Label className="form-label">Job No Of Days</Label>
                            <Input
                              name="JobNoOfDays"
                              placeholder="Insert Job No Of Days"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.JobNoOfDays || ""}
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
                          <div className="mb-3">
                            <Label className="form-label">Job Site Id</Label>
                            <Input
                              name="JobSiteId"
                              type="text"
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
                            />
                            {validation.touched.JobSiteId &&
                            validation.errors.JobSiteId ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobSiteId}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Job Notes</Label>
                            <Input
                              name="JobNotes"
                              type="text"
                              placeholder="Insert Job Notes"
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
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Job WBS</Label>
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
                              <option>Job 1</option>
                              <option>Job 2</option>
                              {/* <option>Freelance</option>
                                                <option>Internship</option> */}
                            </Input>
                            {validation.touched.JobWBS &&
                            validation.errors.JobWBS ? (
                              <FormFeedback type="invalid">
                                {validation.errors.JobWBS}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Create job
                              </button>
                            </div>
                          </Col>
                        </Row>
                        {/* /////////////////////////////////// */}
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="taskname"
                            className="col-form-label col-lg-2"
                          >
                            Task Name
                          </Label>
                          <Col lg="10">
                            <Input
                              id="taskname"
                              name="taskname"
                              type="text"
                              className="form-control"
                              placeholder="Enter Task Name..."
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Task Description
                          </Label>
                          <Col lg="10">
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              placeholder="Place Your Content Here..."
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Task Date
                          </Label>
                          <Col lg="10">
                            <Row>
                              <Col md={6} className="pr-0">
                                <DatePicker
                                  className="form-control"
                                  selected={startDate}
                                  onChange={startDateChange}
                                />
                              </Col>
                              <Col md={6} className="pl-0">
                                <DatePicker
                                  className="form-control"
                                  selected={endDate}
                                  onChange={endDateChange}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </FormGroup>

                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label className="col-form-label col-lg-2">
                              Add Team Member
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
                                  <Col md="6">
                                    <input
                                      type="text"
                                      className="inner form-control"
                                      defaultValue={field.name}
                                      placeholder="Enter Name..."
                                    />
                                  </Col>
                                  <Col md="4">
                                    <div className="mt-4 mt-md-0">
                                      <Input
                                        type="file"
                                        className="form-control"
                                        defaultValue={field.file}
                                      />
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="primary"
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
                            </div>
                          </div>
                          <Row className="justify-content-end">
                            <Col lg="10">
                              <Button
                                color="success"
                                className="inner"
                                onClick={() => {
                                  handleAddFields()
                                }}
                              >
                                Add Number
                              </Button>
                            </Col>
                          </Row>
                        </div>
                        <FormGroup className="mb-4" row>
                          <label
                            htmlFor="taskbudget"
                            className="col-form-label col-lg-2"
                          >
                            Budget
                          </label>
                          <div className="col-lg-10">
                            <Input
                              id="taskbudget"
                              name="taskbudget"
                              type="text"
                              placeholder="Enter Task Budget..."
                              className="form-control"
                            />
                          </div>
                        </FormGroup>
                      </div>
                    </div>
                  </form>
                  <Row className="justify-content-end">
                    <Col lg="10">
                      <Button type="submit" color="primary">
                        Create Task
                      </Button>
                    </Col>
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
