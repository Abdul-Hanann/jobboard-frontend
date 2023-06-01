import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

// const JobNo = (cell) => {
//     return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
// };

const JobName = (cell) => {
    return cell.value ? cell.value : "";
};

const JobDate = (cell) => {
    return cell.value ? cell.value : "";
};

const JobNoOfDays = (cell) => {
    return cell.value ? cell.value : "";
};

const JobSiteId = (cell) => {
    return cell.value ? cell.value : "";
};

const JobNotes = (cell) => {
    return cell.value ? cell.value : "";
};
const JobWBS = (cell) => {
    return cell.value ? cell.value : "";
};

// const Type = (cell) => {
//     switch (cell.value) {
//         case "Full Time":
//             return <Badge className="badge-soft-success">Full Time</Badge>
//         case "Part Time":
//             return <Badge className="badge-soft-danger">Part Time</Badge>
//         case "Freelance":
//             return <Badge className="badge-soft-info">Freelance</Badge>
//         case "Internship":
//             return <Badge className="badge-soft-warning">Internship</Badge>
//     };   
// };

// const PostedDate = (cell) => {
//     return cell.value ? cell.value : "";
// };

// const LastDate = (cell) => {
//     return cell.value ? cell.value : "";
// };

// const Status = (cell) => {
//     switch(cell.value) {
//         case "Active":
//             return <Badge className="bg-success">Active</Badge>
//         case "New":
//             return <Badge className="bg-info">New</Badge>
//         case "Close":
//             return <Badge className="bg-danger">Close</Badge>
//     }
// };


export {JobName, JobDate, JobNoOfDays, JobSiteId, JobNotes, JobWBS };