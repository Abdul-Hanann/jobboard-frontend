import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const JobNo = (cell) => {
//     return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
// };

const FirstName = (cell) => {
    return cell.value ? cell.value : "";
};

const LastName = (cell) => {
    return cell.value ? cell.value : "";
};

const Email = (cell) => {
    return cell.value ? cell.value : "";
};

const PhoneNo = (cell) => {
    return cell.value ? cell.value : "";
};
const TechScheduleIcon = () => (
    <FontAwesomeIcon icon={faWrench} title="Tech Schedule" />
  );
  
  const SiteAdminIcon = () => (
    <FontAwesomeIcon icon={faUserShield} title="Site Admin" />
  );
  
  const UserAdminIcon = () => (
    <FontAwesomeIcon icon={faUserCog} title="User Admin" />
  );
  
  const UserRoles = (cell) => {
    const roles = [];
  
    if (cell.value && cell.value.techSchedule) {
      roles.push(<TechScheduleIcon />);
    }
    if (cell.value && cell.value.siteAdmin) {
      roles.push(<SiteAdminIcon />);
    }
    if (cell.value && cell.value.userAdmin) {
      roles.push(<UserAdminIcon />);
    }
  
    return roles.length > 0 ? roles : "-";
  };
  

  
// const TechSchedule = (cell) => {
//     return cell.value ? cell.value : "";
// };
// const SiteAdmin = (cell) => {
//     return cell.value ? cell.value : "";
// };
// const UserAdmin = (cell) => {
//     return cell.value ? cell.value : "";
// };
// const UserRoles = (cell) => {
//     const roles = [];
  
//     if (cell.value && cell.value.techSchedule) {
//       roles.push("Tech Schedule");
//     }
//     if (cell.value && cell.value.siteAdmin) {
//       roles.push("Site Admin");
//     }
//     if (cell.value && cell.value.userAdmin) {
//       roles.push("User Admin");
//     }
  
//     return roles.join(", ");
//   };
  

// const UserRoles = (cell) => {
//     const roles = [];
//     const { techSchedule, siteAdmin, userAdmin } = cell.value;
  
//     switch (true) {
//       case techSchedule:
//         roles.push("Tech Schedule");
//         break;
//       case siteAdmin:
//         roles.push("Site Admin");
//         break;
//       case userAdmin:
//         roles.push("User Admin");
//         break;
//       default:
//         break;
//     }
  
//     return roles.join(", ");
//   };
  
// const JobNotes = (cell) => {
//     return cell.value ? cell.value : "";
// };
// const JobWBS = (cell) => {
//     return cell.value ? cell.value : "";
// };

// const Type = (cell) => {
//     switch (cell.value) {
//         case "Tech Schedule":
//             return <Badge className="badge-soft-success">Tech Schedule</Badge>
//         case "Site Admin":
//             return <Badge className="badge-soft-danger">Site Admin</Badge>
//         case "User Admin":
//             return <Badge className="badge-soft-info">User Admin</Badge>
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


export {FirstName, LastName, Email, PhoneNo, UserRoles};