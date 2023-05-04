import React from "react"
import { Badge } from "reactstrap"
import { Link } from "react-router-dom"

// const JobNo = (cell) => {
//     return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
// };

const SiteId = cell => {
  return cell.value ? cell.value : ""
}

const Building = cell => {
  return cell.value ? cell.value : ""
}

const AddressLine1 = cell => {
  return cell.value ? cell.value : ""
}

const AddressLine2 = cell => {
  return cell.value ? cell.value : ""
}

const City = cell => {
  return cell.value ? cell.value : ""
}
const State = cell => {
  return cell.value ? cell.value : ""
}
const Zipcode = cell => {
  return cell.value ? cell.value : ""
}
const TimeZone = cell => {
  return cell.value ? cell.value : ""
}

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

export {
  SiteId,
  Building,
  AddressLine1,
  AddressLine2,
  City,
  State,
  Zipcode,
  TimeZone,
}
