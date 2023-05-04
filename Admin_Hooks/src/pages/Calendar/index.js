import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Select from "react-select"
import makeAnimated from "react-select/animated"

//import Images
import verification from "../../assets/images/verification-img.png"
import { convertToLocal } from "../../helpers/dateUtility"
import {
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  getCategories as onGetCategories,
  getEvents as onGetEvents,
  updateEvent as onUpdateEvent,
} from "../../store/actions"

import DeleteModal from "./DeleteModal"

//css
import "@fullcalendar/bootstrap/main.css"

//redux
import { useSelector, useDispatch } from "react-redux"

const AnimatedMulti = props => {
  const { options, value, setValue } = props
  const animatedComponents = makeAnimated()

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      onChange={val => setValue(val)}
      value={value}
      options={options}
    />
  )
}

const Calender = props => {
  //meta title
  document.title = "Calendar | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const [event, setEvent] = useState({})
  const [allEvents, setAllEvents] = useState([])
  const [filteredStartDate, setFilteredStartDate] = useState("")
  const [filteredEndDate, setFilteredEndDate] = useState("")
  const [filteredMiles, setFilteredMiles] = useState("")
  const [filteredStatus, setFilteredStatus] = useState("")
  const [filteredCompany, setFilteredCompany] = useState("")

  // events validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || "",
      category: (event && event.category) || "bg-danger",
      startDate: (event && event.start) || "",
      endDate: (event && event.end) || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Select Your Category"),
      startDate: Yup.string().required("Please Enter Your Start Date"),
      endDate: Yup.string().required("Please Enter Your End Date"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateEvent = {
          id: event.id,
          title: values.title,
          classNames: values.category + " text-white",
          start: event.start,
        }
        // update event
        dispatch(onUpdateEvent(updateEvent))
        validation.resetForm()
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedDay ? selectedDay.date : new Date(),
          className: values.category + " text-white",
        }
        // save new event
        dispatch(onAddNewEvent(newEvent))
        validation.resetForm()
      }
      setSelectedDay(null)
      toggle()
    },
  })

  // category validation
  const categoryValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || "",
      category: (event && event.category) || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Enter Your Billing Name"),
    }),
    onSubmit: values => {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.event_category
          ? values.event_category + " text-white"
          : "bg-danger text-white",
      }
      // save new event

      dispatch(onAddNewEvent(newEvent))
      toggleCategory()
    },
  })

  const { events, categories } = useSelector(state => ({
    events: state.calendar.events,
    categories: state.calendar.categories,
  }))
  const companies = [
    { value: "Company 1", label: "Company 1" },
    { value: "Company 2", label: "Company 2" },
    { value: "Company 3", label: "Company 3" },
  ]
  const jobStatus = [
    { value: 1, label: "Completed" },
    { value: 2, label: "Approved" },
    { value: 3, label: "Pending Approval" },
    { value: 4, label: "Cancelled" },
  ]
  const mileOptions = [
    { value: "5", label: "5 miles" },
    { value: "10", label: "10 miles" },
    { value: "15", label: "15 miles" },
    { value: "20", label: "20 miles" },
    { value: "25", label: "25 miles" },
    { value: "30", label: "30 miles" },
    { value: "35", label: "35 miles" },
    { value: "40", label: "40 miles" },
    { value: "45", label: "45 miles" },
    { value: "50", label: "50 miles" },
  ]
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [modalcategory, setModalcategory] = useState(false)
  const [checkedCategories, setCheckedCategories] = useState([])
  const [selectedDay, setSelectedDay] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(onGetCategories())
    dispatch(onGetEvents())
    // new Draggable(document.getElementById("external-events"), {
    //   itemSelector: ".external-event",
    // })
  }, [dispatch])

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({})
        setIsEdit(false)
      }, 500)
    }
  }, [modal, event])

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false)
      setEvent(null)
    } else {
      setModal(true)
    }
  }

  const toggleCategory = () => {
    setModalcategory(!modalcategory)
  }

  /**
   * Handling date click on calendar
   */
  const handleDateClick = arg => {
    const date = arg["date"]
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const currectDate = new Date()
    const currentHour = currectDate.getHours()
    const currentMin = currectDate.getMinutes()
    const currentSec = currectDate.getSeconds()
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    )
    const modifiedData = { ...arg, date: modifiedDate }

    setSelectedDay(modifiedData)
    toggle()
  }

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event
    console.log(event)
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      startDate: event.start,
      endDate: event.end,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    })
    setIsEdit(true)
    toggle()
  }

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    if (event && event.id) {
      dispatch(onDeleteEvent(event.id))
    }
    setDeleteModal(false)
    toggle()
  }

  /**
   * On category darg event
   */
  const onDrag = event => {
    event.preventDefault()
  }

  /**
   * On calendar drop event
   */
  const onDrop = event => {
    const date = event["date"]
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const currectDate = new Date()
    const currentHour = currectDate.getHours()
    const currentMin = currectDate.getMinutes()
    const currentSec = currectDate.getSeconds()
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    )

    const draggedEl = event.draggedEl
    const draggedElclass = draggedEl.className
    if (
      draggedEl.classList.contains("external-event") &&
      draggedElclass.indexOf("fc-event-draggable") == -1
    ) {
      const modifiedData = {
        id: Math.floor(Math.random() * 100),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      }
      dispatch(onAddNewEvent(modifiedData))
    }
  }
  useEffect(() => {
    if (events) {
      setAllEvents(events)
    }
  }, [events])
  const [selectedIds, setSelectedIds] = useState([])

  const handleCheckboxClick = (event, category) => {
    event.stopPropagation()
    if (!checkedCategories.includes(category.id)) {
      setCheckedCategories(prevIds => [...prevIds, category.id])
      category.checked = true
    } else {
      setCheckedCategories(prevIds => prevIds.filter(id => id !== category.id))
      category.checked = false
    }
  }

  const filterJobs = () => {
    let tempEvent = events
    tempEvent = tempEvent.filter(event =>
      checkedCategories.includes(event.status)
    )
    setAllEvents(tempEvent)
    if (checkedCategories.length === 0) {
      setAllEvents(events)
    }
  }

  useEffect(() => {
    filterJobs()
  }, [checkedCategories, events])

  const clearAllFilters = () => {
    setFilteredCompany("")
    setFilteredStartDate("")
    setFilteredEndDate("")
    setFilteredMiles("")
    setFilteredStatus("")
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Calendar" breadcrumbItem="Full Calendar" />
          <Row>
            <Col className="col-12">
              <Row>
                <Col lg={3}>
                  <Card>
                    <CardBody>
                      <div className="d-grid" style={{ fontWeight: "bolder" }}>
                        {/* <Button
                          color="primary"
                          className="font-16 btn-block"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus-circle-outline me-1" />
                          Create New Event
                        </Button> */}
                        Your Job Schedule
                      </div>

                      <div id="external-events" className="mt-2">
                        {/* <p className="text-muted">Filter your jobs </p> */}
                        {/* {categories &&
                          categories.map((category, i) => (
                            <label
                              key={i}
                              className={`${category.type} categories text-white d-flex align-items-center`}
                            >
                              <div
                              // key={"cat-" + category.id}
                              // onClick={() => {
                              //   filterJob(category.id)
                              // }}
                              // draggable
                              // onDrag={event => onDrag(event, category)}
                              >
                                <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  id={`custom-checkbox-${category.index}`}
                                  name={category.title}
                                  value={category.checked}
                                  checked={category.checked}
                                  onClick={e =>
                                    handleCheckboxClick(e, category)
                                  }
                                />
                                <span
                                  className={`${category.type} categories text-white`}
                                >
                                  {category.title}
                                </span>
                              </div>
                            </label>
                          ))} */}
                        <div className="d-flex flex-row mb-1 justify-content-between align-items-center">
                          <p className="text-muted mt-3">Filter by status </p>
                          <Button
                            className="h-25 bg-primary"
                            onClick={clearAllFilters}
                          >
                            Clear all
                          </Button>
                        </div>
                        <AnimatedMulti
                          options={jobStatus}
                          value={filteredStatus}
                          setValue={setFilteredStatus}
                        />

                        <p className="text-muted mt-3">Filter by company </p>
                        <AnimatedMulti
                          options={companies}
                          value={filteredCompany}
                          setValue={setFilteredCompany}
                        />

                        <p className="text-muted mt-3">Filter by date </p>
                        <p className="text-muted mt-1 mb-0">Start date </p>
                        <Input
                          type="date"
                          className="filter-datepicker"
                          value={filteredStartDate}
                          onChange={event =>
                            setFilteredStartDate(event.target.value)
                          }
                        />
                        <p className="text-muted mt-1 mb-0">End date</p>
                        <Input
                          type="date"
                          className="filter-datepicker"
                          value={filteredEndDate}
                          onChange={event =>
                            setFilteredEndDate(event.target.value)
                          }
                        />
                        <p className="text-muted mt-3">Filter by location</p>

                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="color"
                          value={filteredMiles}
                          onChange={value => setFilteredMiles(value)}
                          options={mileOptions}
                        />
                      </div>

                      {/* <Row className="justify-content-center mt-5">
                        <img
                          src={verification}
                          alt=""
                          className="img-fluid d-block"
                        />
                      </Row> */}
                    </CardBody>
                  </Card>
                </Col>

                <Col lg={9}>
                  {/* fullcalendar control */}
                  <FullCalendar
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                    slotDuration={"00:15:00"}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay",
                    }}
                    events={allEvents}
                    editable={false}
                    droppable={false}
                    selectable={true}
                    // dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    // drop={onDrop}
                  />

                  {/* New/Edit event modal */}
                  <Modal isOpen={modal} className={props.className} centered>
                    <ModalHeader
                      toggle={toggle}
                      tag="h5"
                      className="py-3 px-4 border-bottom-0"
                    >
                      {!!isEdit ? "Edit Event" : "Add Event"}
                    </ModalHeader>
                    <ModalBody className="p-4">
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Job Name</Label>
                              <Input
                                name="title"
                                type="text"
                                // value={event ? event.title : ""}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.title || ""}
                                disabled={true}
                                invalid={
                                  validation.touched.title &&
                                  validation.errors.title
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.title &&
                              validation.errors.title ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.title}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Start date</Label>
                              <Input
                                name="startDate"
                                type="text"
                                value={
                                  event ? convertToLocal(event.startDate) : ""
                                }
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                disabled={true}
                                // value={validation.values.startDate || ""}
                                invalid={
                                  validation.touched.startDate &&
                                  validation.errors.startDate
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.startDate &&
                              validation.errors.startDate ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.startDate}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">End date</Label>
                              <Input
                                name="endDate"
                                type="text"
                                value={
                                  event ? convertToLocal(event.endDate) : ""
                                }
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                disabled={true}
                                // value={validation.values.endDate || ""}
                                invalid={
                                  validation.touched.endDate &&
                                  validation.errors.endDate
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.endDate &&
                              validation.errors.endDate ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.endDate}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          {/* <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Category</Label>
                              <Input
                                type="select"
                                name="category"
                                // value={event ? event.category : "bg-primary"}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.category || ""}
                                invalid={
                                  validation.touched.category &&
                                  validation.errors.category
                                    ? true
                                    : false
                                }
                              >
                                <option value="bg-danger">Danger</option>
                                <option value="bg-success">Success</option>
                                <option value="bg-primary">Primary</option>
                                <option value="bg-info">Info</option>
                                <option value="bg-dark">Dark</option>
                                <option value="bg-warning">Warning</option>
                              </Input>
                              {validation.touched.category &&
                              validation.errors.category ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.category}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col> */}
                        </Row>

                        <Row className="mt-2">
                          {/* <Col className="col-6">
                            {!!isEdit && (
                              <button
                                type="button"
                                className="btn btn-danger me-2"
                                onClick={() => setDeleteModal(true)}
                              >
                                Delete
                              </button>
                            )} 
                          </Col>*/}
                          <Col className="col-6 text-start">
                            <button
                              type="button"
                              className="btn btn-light me-2"
                              onClick={toggle}
                            >
                              Close
                            </button>
                            {/* <button
                              type="submit"
                              className="btn btn-success"
                              id="btn-save-event"
                            >
                              Save
                            </button> */}
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                  {/* <Modal
                    isOpen={modalcategory}
                    toggle={toggleCategory}
                    className={props.className}
                    centered
                  >
                    <ModalHeader toggle={toggleCategory} tag="h5">
                      Add Event
                    </ModalHeader>
                    <ModalBody className="p-4">
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          categoryValidation.handleSubmit()
                          return false
                        }}
                      >
                        <Row>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Event Name</Label>
                              <Input
                                name="title"
                                type="text"
                                // value={event ? event.title : ""}
                                placeholder="Insert Event Name"
                                onChange={categoryValidation.handleChange}
                                onBlur={categoryValidation.handleBlur}
                                value={categoryValidation.values.title || ""}
                                invalid={
                                  categoryValidation.touched.title &&
                                  categoryValidation.errors.title
                                    ? true
                                    : false
                                }
                              />
                              {categoryValidation.touched.title &&
                              categoryValidation.errors.title ? (
                                <FormFeedback type="invalid">
                                  {categoryValidation.errors.title}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Category</Label>
                              <Input
                                type="select"
                                name="category"
                                placeholder="All Day Event"
                                onChange={categoryValidation.handleChange}
                                onBlur={categoryValidation.handleBlur}
                                value={categoryValidation.values.category || ""}
                                invalid={
                                  categoryValidation.touched.category &&
                                  categoryValidation.errors.category
                                    ? true
                                    : false
                                }
                              >
                                <option value="bg-danger">Danger</option>
                                <option value="bg-success">Success</option>
                                <option value="bg-primary">Primary</option>
                                <option value="bg-info">Info</option>
                                <option value="bg-dark">Dark</option>
                                <option value="bg-warning">Warning</option>
                              </Input>
                              {categoryValidation.touched.category &&
                              categoryValidation.errors.category ? (
                                <FormFeedback type="invalid">
                                  {categoryValidation.errors.category}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col className="col-6">
                            <button
                              type="button"
                              className="btn btn-danger"
                              id="btn-delete-event"
                            >
                              Delete
                            </button>
                          </Col>
                          <Col className="col-6 text-end">
                            <button
                              type="button"
                              className="btn btn-light me-1"
                              onClick={toggleCategory}
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success"
                              id="btn-save-event"
                            >
                              Save
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Calender.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
}

export default Calender
