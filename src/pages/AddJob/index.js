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

import { JobName, RequestedDate, NoOfDays, NotesAboutJobs, ScheduledDays}
    from "./JobListCol";

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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

function addJob() {

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
            // jobId: (job && job.jobId) || '',
            JobName: (job && job.JobName) || '',
            RequestedDate: (job && job.RequestedDate) || '',
            NoOfDays: (job && job.NoOfDays) || '',
            NotesAboutJobs: (job && job.NotesAboutJobs) || '',
            ScheduledDays: (job && job.ScheduledDays) || '',
            // type: (job && job.type) || '',
            // status: (job && job.status) || '',

        },
        validationSchema: Yup.object({
            // jobId: Yup.string().matches(
            //     /[0-9\.\-\s+\/()]+/,
            //     "Please Enter Valid Job Id"
            // ).required("Please Enter Your Job Id"),
            JobName: Yup.string().required("Please Enter Your Job Name"),
            RequestedDate: Yup.string().required("Please Enter Your ComJob Requested Date"),
            NoOfDays: Yup.string().required("Please Enter Your Job No of Days"),
            NotesAboutJobs: Yup.string().required("Please Enter notwes about Jobs"),
            ScheduledDays: Yup.string().required("Please Enter scheduled days"),
            // type: Yup.string().required("Please Enter Your Type"),
            // status: Yup.string().required("Please Enter Your Status"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateJobList = {
                    // id: job ? job.id : 0,
                    // jobId: values.jobId,
                    JobName: values.JobName,
                    RequestedDate: values.RequestedDate,
                    NoOfDays: values.NoOfDays,
                    NotesAboutJobs: values.NotesAboutJobs,
                    ScheduledDays: values.ScheduledDays,
                    // type: values.type,
                    // postedDate: "02 June 2021",
                    // lastDate: "25 June 2021",
                    // status: values.status,
                };
                // update Job
                dispatch(onUpdateJobList(updateJobList));
                validation.resetForm();
            } else {
                const newJobList = {
                    // id: Math.floor(Math.random() * (30 - 20)) + 20,
                    // jobId: values["jobId"],
                    JobName: values["JobName"],
                    RequestedDate: values["RequestedDate"],
                    NoOfDays: values["NoOfDays"],
                    NotesAboutJobs: values["NotesAboutJobs"],
                    ScheduledDays: values["ScheduledDays"],
                    // type: values["type"],
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
            // id: job.id,
            // jobId: job.jobId,
            JobName: job.JobName,
            RequestedDate: job.RequestedDate,
            NoOfDays: job.NoOfDays,
            NotesAboutJobs: job.NotesAboutJobs,
            ScheduledDays: job.ScheduledDays,
            // type: job.type,
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
                Header: 'Job Name',
                accessor: 'JobName',
                filterable: true,
                Cell: (cellProps) => {
                    return <JobName {...cellProps} />;
                }
            },
            {
                Header: 'Requested Date',
                accessor: 'RequestedDate',
                filterable: true,
                Cell: (cellProps) => {
                    return <RequestedDate {...cellProps} />;
                }
            },
            {
                Header: 'No Of Days',
                accessor: 'NoOfDays',
                filterable: true,
                Cell: (cellProps) => {
                    return <NoOfDays {...cellProps} />;
                }
            },
            {
                Header: 'Notes About Jobs',
                accessor: 'NotesAboutJobs',
                filterable: true,
                Cell: (cellProps) => {
                    return <NotesAboutJobs {...cellProps} />;
                }
            },
            {
                Header: 'Scheduled Days',
                accessor: 'ScheduledDays',
                Cell: (cellProps) => {
                    return <ScheduledDays {...cellProps} />;
                }
            },
            // {
            //     Header: 'Type',
            //     accessor: 'type',
            //     Cell: (cellProps) => {
            //         return <Type {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'Posted Date',
            //     accessor: 'postedDate',
            //     Cell: (cellProps) => {
            //         return <PostedDate {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'Last Date',
            //     accessor: 'lastDate',
            //     Cell: (cellProps) => {
            //         return <LastDate {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'Status',
            //     accessor: 'status',
            //     disableFilters: true,
            //     Cell: (cellProps) => {
            //         return <Status {...cellProps} />;
            //     }
            // },
            // {
            //     Header: 'Action',
            //     accessor: 'action',
            //     disableFilters: true,
            //     Cell: (cellProps) => {
            //         return (
            //             <ul className="list-unstyled hstack gap-1 mb-0">
            //                 <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
            //                     <Link to="/job-details" className="btn btn-sm btn-soft-primary">
            //                         <i className="mdi mdi-eye-outline" id="viewtooltip"></i></Link>
            //                 </li>
            //                 <UncontrolledTooltip placement="top" target="viewtooltip">
            //                     View
            //                 </UncontrolledTooltip>

            //                 <li>
            //                     <Link
            //                         to="#"
            //                         className="btn btn-sm btn-soft-info"
            //                         onClick={() => {
            //                             const jobData = cellProps.row.original;
            //                             handleJobClick(jobData);
            //                         }}
            //                     >
            //                         <i className="mdi mdi-pencil-outline" id="edittooltip" />
            //                         <UncontrolledTooltip placement="top" target="edittooltip">
            //                             Edit
            //                         </UncontrolledTooltip>
            //                     </Link>
            //                 </li>

            //                 <li>
            //                     <Link
            //                         to="#"
            //                         className="btn btn-sm btn-soft-danger"
            //                         onClick={() => {
            //                             const jobData = cellProps.row.original;
            //                             onClickDelete(jobData);
            //                         }}
            //                     >
            //                         <i className="mdi mdi-delete-outline" id="deletetooltip" />
            //                         <UncontrolledTooltip placement="top" target="deletetooltip">
            //                             Delete
            //                         </UncontrolledTooltip>
            //                     </Link>
            //                 </li>
            //             </ul>
            //         );
            //     }
            // },
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
                                        <h5 className="mb-0 card-title flex-grow-1">Jobs Lists</h5>
                                        <div className="flex-shrink-0">
                                            <Link to="#!" onClick={() => setModal(true)} className="btn btn-primary me-1">Add New Job</Link>
                                            {/* <Link to="#!" className="btn btn-light me-1"><i className="mdi mdi-refresh"></i></Link>
                                            <UncontrolledDropdown className="dropdown d-inline-block me-1">
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
                                        isJobListGlobalFilter={true}
                                        customPageSize={10}
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
                                            <Label className="form-label">Job Name</Label>
                                            <Input
                                                name="JobName"
                                                type="text"
                                                placeholder="Insert Job Name"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.JobName || ""}
                                                invalid={
                                                    validation.touched.JobName && validation.errors.JobName ? true : false
                                                }
                                            />
                                            {validation.touched.JobName && validation.errors.JobName ? (
                                                <FormFeedback type="invalid">{validation.errors.JobName}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Requested Date</Label>
                                            <Input
                                                name="RequestedDate"
                                                type="text"
                                                placeholder="Insert Requested Date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.RequestedDate || ""}
                                                invalid={
                                                    validation.touched.RequestedDate && validation.errors.RequestedDate ? true : false
                                                }
                                            />
                                            {validation.touched.RequestedDate && validation.errors.RequestedDate ? (
                                                <FormFeedback type="invalid">{validation.errors.RequestedDate}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">No Of Days</Label>
                                            <Input
                                                name="NoOfDays"
                                                placeholder="Insert No Of Days"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.NoOfDays || ""}
                                                invalid={
                                                    validation.touched.NoOfDays && validation.errors.NoOfDays ? true : false
                                                }
                                            />
                                            {validation.touched.NoOfDays && validation.errors.NoOfDays ? (
                                                <FormFeedback type="invalid">{validation.errors.NoOfDays}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Notes About Jobs</Label>
                                            <Input
                                                name="NotesAboutJobs"
                                                type="text"
                                                placeholder="Insert Notes About Jobs"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.NotesAboutJobs || ""
                                                }
                                                invalid={
                                                    validation.touched.NotesAboutJobs && validation.errors.NotesAboutJobs ? true : false
                                                }
                                            />
                                            {validation.touched.NotesAboutJobs && validation.errors.NotesAboutJobs ? (
                                                <FormFeedback type="invalid">{validation.errors.NotesAboutJobs}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Scheduled Days</Label>
                                            <Input
                                                name="ScheduledDays"
                                                type="text"
                                                placeholder="Insert Scheduled Days"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.ScheduledDays || ""}
                                                invalid={
                                                    validation.touched.ScheduledDays && validation.errors.ScheduledDays ? true : false
                                                }
                                            />
                                            {validation.touched.ScheduledDays && validation.errors.ScheduledDays ? (
                                                <FormFeedback type="invalid">{validation.errors.ScheduledDays}</FormFeedback>
                                            ) : null}
                                        </div>
                                        {/* <div className="mb-3">
                                            <Label className="form-label">Type</Label>
                                            <Input
                                                name="type"
                                                type="select"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.type || ""
                                                }
                                                invalid={
                                                    validation.touched.type && validation.errors.type
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <option>Full Time</option>
                                                <option>Part Time</option>
                                                <option>Freelance</option>
                                                <option>Internship</option>

                                            </Input>
                                            {validation.touched.type && validation.errors.type ? (
                                                <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
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
                                        </div>*/}
                                    </Col> 
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-success save-user"
                                            >
                                                ADD
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


export default addJob;