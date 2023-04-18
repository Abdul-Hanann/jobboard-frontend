import React, { useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from 'components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";
import { jobs } from "common/data";

//import components
import Breadcrumbs from 'components/Common/Breadcrumb';
import DeleteModal from 'components/Common/DeleteModal';

import {
    getJobList as onGetJobList,
    addNewJobList as onAddNewJobList,
    updateJobList as onUpdateJobList,
    deleteJobList as onDeleteJobList,
} from "store/actions";

import {FirstName, LastName, Email, PhoneNo, UserRoles}
    from "./UserAdminCol";

//redux
import { useSelector, useDispatch } from "react-redux";

import {
    Col,
    Row,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
    Card,
    CardBody,
    FormGroup,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

function JobList() {

    //meta title
    document.title = "Jobs List | SAIT Job Board";

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [jobsList, setJobsList] = useState([]);
    const [job, setJob] = useState(null);

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            // JobNo: (job && job.JobNo) || '',
            FirstName: (job && job.FirstName) || '',
            LastName: (job && job.LastName) || '',
            Email: (job && job.Email) || '',
            UserRoles: (job && job.UserRoles) || '',
            // JobNotes: (job && job.JobNotes) || '',
            // JobWBS: (job && job.JobWBS) || '',
        },
        validationSchema: Yup.object({
            // JobNo: Yup.string().matches(
            //     /[0-9\.\-\s+\/()]+/,
            //     "Please Enter Valid Job Id"
            // ).required("Please Enter Your Job Id"),
            FirstName: Yup.string().required("Please Enter Your First Name"),
            LastName: Yup.string().required("Please Enter Your Last Date"),
            Email: Yup.string().required("Please Enter Your Email"),
            PhoneNo: Yup.string().required("Please Enter Your Phone Number"),
            UserRoles: Yup.string().required("Please Select Your Role"),
            // JobWBS: Yup.string().required("Please Enter Your JobWBS"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateJobList = {
                    id: job ? job.id : 0,
                    // JobNo: values.JobNo,
                    FirstName: values.FirstName,
                    LastName: values.LastName,
                    Email: values.Email,
                    PhoneNo: values.PhoneNo,
                    UserRoles: values.UserRoles,
                    // JobWBS: values.JobWBS,
                    // postedDate: "02 June 2021",
                    // lastDate: "25 June 2021",
                    // status: values.status,
                };
                // update Job
                dispatch(onUpdateJobList(updateJobList));
                validation.resetForm();
            } else {
                const newJobList = {
                    id: Math.floor(Math.random() * (30 - 20)) + 20,
                    // JobNo: values["JobNo"],
                    FirstName: values["FirstName"],
                    LastName: values["LastName"],
                    Email: values["Email"],
                    PhoneNo: values["PhoneNo"],
                    UserRoles: values["UserRoles"],
                    // JobWBS: values["JobWBS"],
                    // postedDate: "02 June 2021",
                    // lastDate: "25 June 2021",
                    // status: values["status"],
                };
                // save new Job
                dispatch(onAddNewJobList(newJobList));
                validation.resetForm();
            }
            toggle();
        },
    });

    const dispatch = useDispatch();
    const { jobs } = useSelector(state => ({
        jobs: state.JobReducer.jobs,
    }));

    useEffect(() => {
        if (jobs && !jobs.length) {
            dispatch(onGetJobList());
        }
    }, [dispatch, jobs]);

    useEffect(() => {
        setJobsList(jobs);
    }, [jobs]);

    useEffect(() => {
        if (!isEmpty(jobs) && !!isEdit) {
            setJobsList(jobs);
            setIsEdit(false);
        }
    }, [jobs]);

    const toggle = () => {
        if (modal) {
            setModal(false);
            setJob(null);
        } else {
            setModal(true);
        }
    };

    const handleJobClick = arg => {
        const job = arg;
        setJob({
            id: job.id,
            // JobNo: job.JobNo,
            FirstName: job.FirstName,
            LastName: job.LastName,
            Email: job.Email,
            PhoneNo: job.PhoneNo,
            UserRoles: job.UserRoles,
            // JobWBS: job.JobWBS,
            // status: job.status,
        });

        setIsEdit(true);

        toggle();
    };

    //delete Job
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (job) => {
        setJob(job);
        setDeleteModal(true);
    };

    const handleDeletejob = () => {
        if (job && job.id) {
            dispatch(onDeleteJobList(job.id));
            setDeleteModal(false);
        }
    };
    const handleJobClicks = () => {
        setJobsList("");
        setIsEdit(false);
        toggle();
    };

    const columns = useMemo(
        () => [
            // {
            //     Header: 'No',
            //     accessor: 'jobId',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <JobNo {...cellProps} />;
            //     }
            // },
            {
                Header: 'First Name',
                accessor: 'FirstName',
                filterable: true,
                Cell: (cellProps) => {
                    return <FirstName {...cellProps} />;
                }
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
                filterable: true,
                Cell: (cellProps) => {
                    return <LastName {...cellProps} />;
                }
            },
            {
                Header: 'Email',
                accessor: 'Email',
                filterable: true,
                Cell: (cellProps) => {
                    return <Email {...cellProps} />;
                }
            },
            {
                Header: 'Phone No',
                accessor: 'PhoneNo',
                filterable: true,
                Cell: (cellProps) => {
                    return <PhoneNo {...cellProps} />;
                }
            },
            // {
            //     Header: 'Tech Schedule',
            //     accessor: 'TechSchedule',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <TechSchedule {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'Site Admin',
            //     accessor: 'SiteAdmin',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <SiteAdmin {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'User Admin',
            //     accessor: 'UserAdmin',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <UserAdmin {...cellProps} />;
            //     }
            // },
            {
                Header: 'User Roles',
                accessor: 'UserRoles',
                Cell: (cellProps) => {
                  return <UserRoles {...cellProps} />;
                },
              },
              
            // {
            //     Header: 'User Roles',
            //     accessor: 'userRoles',
            //     Cell: ({ Cell: { cellProps } }) => {
            //     return <UserRoles {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'User Roles',
            //     accessor: 'userRoles',
            //     Cell: ({ cell: { value } }) => <UserRoles value={value} />
            // },
            {
                Header: 'Action',
                accessor: 'action',
                disableFilters: true,
                Cell: (cellProps) => {
                    return (
                        <ul className="list-unstyled hstack gap-1 mb-0">
                            <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                                    <i className="mdi mdi-eye-outline" id="viewtooltip"></i></Link>
                            </li>
                            <UncontrolledTooltip placement="top" target="viewtooltip">
                                View
                            </UncontrolledTooltip>

                            <li>
                                <Link
                                    to="#"
                                    className="btn btn-sm btn-soft-info"
                                    onClick={() => {
                                        const jobData = cellProps.row.original;
                                        handleJobClick(jobData);
                                    }}
                                >
                                    <i className="mdi mdi-pencil-outline" id="edittooltip" />
                                    <UncontrolledTooltip placement="top" target="edittooltip">
                                        Edit
                                    </UncontrolledTooltip>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="#"
                                    className="btn btn-sm btn-soft-danger"
                                    onClick={() => {
                                        const jobData = cellProps.row.original;
                                        onClickDelete(jobData);
                                    }}
                                >
                                    <i className="mdi mdi-delete-outline" id="deletetooltip" />
                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                        Delete
                                    </UncontrolledTooltip>
                                </Link>
                            </li>
                        </ul>
                    );
                }
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeletejob}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Lists" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody className="border-bottom">
                                    <div className="d-flex align-items-center">
                                        <h5 className="mb-0 card-title flex-grow-1">Add Admin</h5>
                                        <div className="flex-shrink-0">
                                            <Link to="#!" onClick={() => setModal(true)} className="btn btn-primary me-1">Add Admin</Link>
                                            {/* <Link to="#!" className="btn btn-light me-1"><i className="mdi mdi-refresh"></i></Link> */}
                                            {/* <UncontrolledDropdown className="dropdown d-inline-block me-1">
                                                <DropdownToggle type="menu" className="btn btn-success" id="dropdownMenuButton1">
                                                    <i className="mdi mdi-dots-vertical"></i></DropdownToggle>
                                                <DropdownMenu>
                                                    <li><DropdownItem href="#">Action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Another action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                                </DropdownMenu>
                                            </UncontrolledDropdown> */}
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody>
                                    <TableContainer
                                        columns={columns}
                                        data={jobs}
                                        isGlobalFilter={true}
                                        isAddOptions={false}
                                        handleJobClicks={handleJobClicks}
                                        // isJobListGlobalFilter={true}
                                        customPageSize={1}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle} tag="h4">
                            {!!isEdit ? "Edit Job" : "Add Job"}
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col className="col-12">
                                        {/* <div className="mb-3">
                                            <Label className="form-label"> Job Id</Label>
                                            <Input
                                                name="jobId"
                                                type="text"
                                                placeholder="Insert Job Id"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.jobId || ""}
                                                invalid={
                                                    validation.touched.jobId && validation.errors.jobId ? true : false
                                                }
                                            />
                                            {validation.touched.jobId && validation.errors.jobId ? (
                                                <FormFeedback type="invalid">{validation.errors.jobId}</FormFeedback>
                                            ) : null}
                                        </div> */}
                                        <div className="mb-3">
                                            <Label className="form-label">First Name</Label>
                                            <Input
                                                name="FirstName"
                                                type="text"
                                                placeholder="Insert First Name"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.FirstName || ""}
                                                invalid={
                                                    validation.touched.FirstName && validation.errors.FirstName ? true : false
                                                }
                                            />
                                            {validation.touched.FirstName && validation.errors.FirstName ? (
                                                <FormFeedback type="invalid">{validation.errors.FirstName}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label"> Last Name</Label>
                                            <Input
                                                name="LastName"
                                                type="text"
                                                placeholder="Insert Job Date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.LastName || ""}
                                                invalid={
                                                    validation.touched.LastName && validation.errors.LastName ? true : false
                                                }
                                            />
                                            {validation.touched.LastName && validation.errors.LastName ? (
                                                <FormFeedback type="invalid">{validation.errors.LastName}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Email</Label>
                                            <Input
                                                name="Email"
                                                placeholder="Enter your Email Address"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.Email || ""}
                                                invalid={
                                                    validation.touched.Email && validation.errors.Email ? true : false
                                                }
                                            />
                                            {validation.touched.Email && validation.errors.Email ? (
                                                <FormFeedback type="invalid">{validation.errors.Email}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Phone No</Label>
                                            <Input
                                                name="PhoneNo"
                                                type="text"
                                                placeholder="Enter ypur Phone Number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.PhoneNo || ""
                                                }
                                                invalid={
                                                    validation.touched.PhoneNo && validation.errors.PhoneNo ? true : false
                                                }
                                            />
                                            {validation.touched.PhoneNo && validation.errors.PhoneNo ? (
                                                <FormFeedback type="invalid">{validation.errors.PhoneNo}</FormFeedback>
                                            ) : null}
                                        </div>
                                        {/* <div className="mb-3">
                                            <Label className="form-label">Job Notes</Label>
                                            <Input
                                                name="JobNotes"
                                                type="text"
                                                placeholder="Insert Job Notes"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.JobNotes || ""}
                                                invalid={
                                                    validation.touched.JobNotes && validation.errors.JobNotes ? true : false
                                                }
                                            />
                                            {validation.touched.JobNotes && validation.errors.JobNotes ? (
                                                <FormFeedback type="invalid">{validation.errors.JobNotes}</FormFeedback>
                                            ) : null}
                                        </div> */}
                                        <div className="mb-3">
                                            <Label className="form-label">User Roles</Label>
                                            <FormGroup check>
                                                <Label check>
                                                <Input
                                                    type="checkbox"
                                                    name="techSchedule"
                                                    checked={validation.values.techSchedule}
                                                    // onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                />
                                                Tech Schedule
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                <Input
                                                    type="checkbox"
                                                    name="siteAdmin"
                                                    checked={validation.values.siteAdmin}
                                                    // onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                />
                                                Site Admin
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                <Input
                                                    type="checkbox"
                                                    name="userAdmin"
                                                    checked={validation.values.userAdmin}
                                                    // onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                />
                                                User Admin
                                                </Label>
                                            </FormGroup>
                                            {validation.touched.userRoles && validation.errors.userRoles ? (
                                                <div className="text-danger">{validation.errors.userRoles}</div>
                                            ) : null}
                                            </div>

                                        {/* <div className="mb-3">
                                            <Label className="form-label">Status</Label>
                                            <Input
                                                name="status"
                                                type="select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.status || ""
                                                }
                                                invalid={
                                                    validation.touched.status && validation.errors.status ? true : false
                                                }
                                            >
                                                <option>Active</option>
                                                <option>New</option>
                                                <option>Close</option>
                                            </Input>
                                            {validation.touched.status && validation.errors.status ? (
                                                <FormFeedback status="invalid">{validation.errors.status}</FormFeedback>
                                            ) : null}
                                        </div> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-success save-user"
                                            >
                                                Add Admin
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </React.Fragment>
    );
}


export default JobList;