import React, { useEffect, useState } from "react"
// import { Link, withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty, map } from "lodash"
import * as moment from "moment"
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

//Import Component
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

//Import Image
import images from "assets/images"
import img from "assets/images/companies/img-1.png"

import {
  getJobList as onGetJobList,
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
  deleteJobList as onDeleteJobList,
} from "store/actions"

import {
  getProjects as onGetProjects,
  addNewProject as onAddNewProject,
  updateProject as onUpdateProject,
  deleteProject as onDeleteProject,
} from "../../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const ProjectStatus = ({ status }) => {
  switch (status) {
    case "Pending":
      return <Badge className="bg-warning"> {status} </Badge>

    case "Delay":
      return <Badge className="bg-danger"> {status} </Badge>

    case "Completed":
      return <Badge className="bg-success"> {status} </Badge>

    default:
      return <Badge className="bg-success"> {status} </Badge>
  }
}

const JobsList = () => {
  //meta title
  document.title = "Job List | SA IT Services"

  const dispatch = useDispatch()
  const [project, setProject] = useState()
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (project && project.id) || "",
      img: (project && project.img) || "",
      name: (project && project.name) || "",
      description: (project && project.description) || "",
      status: (project && project.status) || "",
      color: (project && project.color) || "",
      dueDate: (project && project.dueDate) || "",
      team: (project && project.team) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Your Description"),
      status: Yup.string().required("Please Enter Your Status"),
      color: Yup.string().required("Please Enter Your Color"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateProject = {
          id: project.id,
          img: values.img,
          name: values.name,
          description: values.description,
          status: values.status,
          color: values.color,
          dueDate: values.dueDate,
          team: values.team,
        }

        // update project
        dispatch(onUpdateProject(updateProject))
      } else {
        const newProject = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          description: values["description"],
          status: values["status"],
          color: values["color"],
          dueDate: values["dueDate"],
          team: values["team"],
        }
        // save new project
        dispatch(onAddNewProject(newProject))
      }
      toggle()
    },
  })

  // const { projects } = useSelector(state => ({
  //   projects: state.projects.projects,
  // }))

  const { jobsList } = useSelector(state => ({
    jobsList: state.JobReducer.jobsList,
  }))
  // const { jobsList } = useSelector(state => {
  //   const jobsList = state.JobReducer?.jobsList
  //   if (!jobsList) {
  //     console.error("Error: jobsList is undefined")
  //   }
  //   return { jobsList }
  // })

  console.log("jobs List:", jobsList)
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [projectList, setProjectList] = useState([])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setProject(null)
    } else {
      setModal(true)
    }
  }

  const navigate = useNavigate()
  const handleViewClick = jobList => {
    console.log("job list before:", jobList)
    navigate("/joblist/jobDetails", { state: { jobList } })
  }

  const handleEditClick = jobList => {
    navigate("/joblist/editJob", {
      state: { jobList: jobList, canEdit: true },
    })
  }

  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = project => {
    setProject(project)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (project && project.id) {
      dispatch(onDeleteProject(project.id))
    }
    setDeleteModal(false)
  }
  // useEffect(() => {
  //   if (jobsList && !jobsList.length) {
  //     dispatch(onGetJobList())
  //   }
  // }, [dispatch, jobsList])
  useEffect(() => {
    console.log("fetch job API")
    dispatch(onGetJobList())
  }, [dispatch])

  // useEffect(() => {
  //   setJobsList(jobsList)
  // }, [jobsList])

  useEffect(() => {
    console.log("fetch project API")
    dispatch(onGetProjects())
  }, [dispatch])

  // useEffect(() => {
  //   setProjectList(projects)
  // }, [projects])

  // useEffect(() => {
  //   if (!isEmpty(projects)) {
  //     setProjectList(projects)
  //   }
  // }, [projects])

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      {/* <div className="page-content"> */}
      <div>
        {/* <Container fluid> */}
        {/* Render Breadcrumbs */}
        {/* <Breadcrumbs title="Projects" breadcrumbItem="Projects List" /> */}

        <Row>
          <Col lg="12">
            <div>
              <div className="table-responsive">
                <Table
                  className="project-list-table table-nowrap align-middle table-borderless"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr
                      style={{
                        fontSize: 14,
                        backgroundColor: "#003768",
                        color: "white",
                        // textAlign: "center",
                      }}
                    >
                      <th scope="col" style={{ width: "100px" }}>
                        Logo
                      </th>
                      <th scope="col">Job Name</th>
                      <th scope="col">Job Date</th>
                      <th scope="col">Job No Of Days</th>
                      <th scope="col">Job Site Id</th>
                      {/* <th scope="col">Job Notes</th>
                      <th scope="col">Job WBS</th> */}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(jobsList, (jobList, index) => (
                      // console.log("project data: ", project),
                      <tr key={index}>
                        {/* console.log("job List data: ",jobList) */}
                        <td>
                          {/* {jobList.id} */}
                          <img src={img} alt="" className="avatar-sm" />
                          {/* <img src={img} alt="" className="avatar-sm" /> */}
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            {/* <Link
                              to={`/projects-overview/${project.id}`}
                              className="text-dark"
                            > */}
                            {/* <img src={img} alt="" className="avatar-sm" /> */}
                            {jobList.JobName}
                            {/* </Link> */}
                          </h5>
                          {/* <p className="text-muted mb-0">
                            {project.description}
                          </p> */}
                        </td>
                        <td> {handleValidDate(jobList.jobDate)}</td>
                        <td>
                          <p> {jobList.JobNoOfDays}</p>
                        </td>
                        {/* <td>
                          <p> {jobList.JobNotes}</p>
                        </td> */}
                        <td>
                          <p> {jobList.JobSiteId}</p>
                        </td>
                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              // href="#"
                              className="card-drop"
                              tag="a"
                            >
                              <i className="mdi mdi-dots-horizontal font-size-18" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem
                                onClick={() => handleViewClick(jobList)}
                              >
                                <i className="mdi mdi-view-dashboard font-size-16 text-success me-1" />{" "}
                                View
                              </DropdownItem>
                              <DropdownItem
                                href="#"
                                onClick={() => handleEditClick(jobList)}
                              >
                                <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#"
                                onClick={() => onClickDelete(jobList)}
                              >
                                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    )).reverse()}
                  </tbody>
                </Table>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} tag="h4">
                    {!!isEdit ? "Edit Project" : "Add Project"}
                  </ModalHeader>
                  <ModalBody>
                    <Form
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      <Row>
                        <Col xs={12}>
                          <Input
                            type="hidden"
                            value={validation.values.img || ""}
                            name="img"
                          />

                          <Input
                            type="hidden"
                            value={validation.values.team || ""}
                            name="team"
                          />
                          <div className="mb-3">
                            <Label className="form-label">Name</Label>
                            <Input
                              name="name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={
                                validation.touched.name &&
                                validation.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.name &&
                            validation.errors.name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Description</Label>
                            <Input
                              name="description"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.description || ""}
                              invalid={
                                validation.touched.description &&
                                validation.errors.description
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.description &&
                            validation.errors.description ? (
                              <FormFeedback type="invalid">
                                {validation.errors.description}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Status</Label>
                            <Input
                              name="status"
                              id="status1"
                              type="select"
                              className="form-select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.status || ""}
                            >
                              <option>Completed</option>
                              <option>Pending</option>
                              <option>Delay</option>
                            </Input>
                            {validation.touched.status &&
                            validation.errors.status ? (
                              <FormFeedback type="invalid">
                                {validation.errors.status}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Color</Label>
                            <Input
                              name="color"
                              type="select"
                              className="form-select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.color || ""}
                              invalid={
                                validation.touched.color &&
                                validation.errors.color
                                  ? true
                                  : false
                              }
                            >
                              <option>success</option>
                              <option>warning</option>
                              <option>danger</option>
                            </Input>
                            {validation.touched.color &&
                            validation.errors.color ? (
                              <FormFeedback type="invalid">
                                {validation.errors.color}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">dueDate</Label>
                            <Input
                              name="dueDate"
                              type="date"
                              format="YYYY/MM/DD"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.dueDate &&
                                validation.errors.dueDate
                                  ? true
                                  : false
                              }
                              value={validation.values.dueDate || ""}
                            ></Input>
                            {validation.touched.dueDate &&
                            validation.errors.dueDate ? (
                              <FormFeedback type="invalid">
                                {validation.errors.dueDate}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-success save-user"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <div className="text-center my-3">
              <Link to="#" className="text-success">
                <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                Load more
              </Link>
            </div>
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default withRouter(JobsList)
