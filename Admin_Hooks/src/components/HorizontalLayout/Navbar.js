import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import { Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { userTypes } from "pages/Authentication/userTypes"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [dashboard, setdashboard] = useState(false)
  const [ui, setui] = useState(false)
  const [app, setapp] = useState(false)
  const [email, setemail] = useState(false)
  const [ecommerce, setecommerce] = useState(false)
  const [crypto, setcrypto] = useState(false)
  const [project, setproject] = useState(false)
  const [task, settask] = useState(false)
  const [contact, setcontact] = useState(false)
  const [blog, setBlog] = useState(false)
  const [job, setJob] = useState(false)
  const [candidate, setCandidate] = useState(false)
  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [invoice, setinvoice] = useState(false)
  const [auth, setauth] = useState(false)
  const [utility, setutility] = useState(false)


  const userType = localStorage.getItem("userType")
  console.log("userType:", userType)

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    removeActivation(items)
    for (var i = 0; i < items.length; ++i) {
      if (window.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement
      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active")
        }
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav" style={{ backgroundColor: "#003768" }}>
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                {(userType === userTypes.ROLE_ADMIN ||
                  userType === userTypes.ROLE_SITE_ADMIN ||
                  userType === userTypes.ROLE_JOB_CREATOR ||
                  userType === userTypes.ROLE_SCHEDULER ||
                  userType === userTypes.ROLE_TECHNICIAN) && (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle arrow-none"
                        to="/dashboard"
                      >
                        <i className="bx bx-home-circle me-2"></i>
                        {props.t("Dashboard")}
                      </Link>
                    </li>
                  )}
                {(userType === userTypes.ROLE_ADMIN ||
                  userType === userTypes.ROLE_SITE_ADMIN ||
                  userType === userTypes.ROLE_SCHEDULER ||
                  userType === userTypes.ROLE_TECHNICIAN) && (
                    <li className="nav-item dropdown">
                      <Link
                        to="/schedule"
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        <i className="bx bx-tone me-2"></i>
                        Tech Schedule
                      </Link>
                    </li>
                  )}
                {(userType === userTypes.ROLE_ADMIN ||
                  userType === userTypes.ROLE_SITE_ADMIN ||
                  userType === userTypes.ROLE_JOB_CREATOR ||
                  userType === userTypes.ROLE_SCHEDULER ||
                  userType === userTypes.ROLE_TECHNICIAN) && (
                    <li className="nav-item dropdown">
                      <Link
                        to="/job-list"
                        className="nav-link dropdown-togglez arrow-none"
                      >
                        <i className="bx bx-customize me-2"></i>
                        Job List
                      </Link>
                    </li>
                  )}
                {(userType === userTypes.ROLE_ADMIN ||
                  userType === userTypes.ROLE_SITE_ADMIN) && (
                    <li className="nav-item dropdown">
                      <Link
                        to="/siteadmin"
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        <i className="bx bx-collection me-2"></i>
                        Site Admin
                      </Link>
                    </li>
                  )}
                {userType === userTypes.ROLE_ADMIN && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      to="/jobwbs"
                    >
                      <i className="bx bx-file me-2"></i>
                      JobWBS Admin
                    </Link>
                  </li>
                )}
                {/* {userType === userTypes.ROLE_ADMIN && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      to="/useradmin"
                    >
                      <i className="bx bx-file me-2"></i>
                      User Admin
                    </Link>
                  </li>
                )} */}
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
