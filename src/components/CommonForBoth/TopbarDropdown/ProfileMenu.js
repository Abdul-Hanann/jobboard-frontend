import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap"
// redux
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { logoutUser } from "store/actions"
import { GET_LOGOUT } from "helpers/url_helper"

// users
import user1 from "../../../assets/images/avatar1.png"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState(localStorage.getItem("name"))

  const dispatch = useDispatch()
  const history = useNavigate()
  const baseUrl = process.env.REACT_APP_API_ENDPOINT
  const logoutFunc = () => {
    console.log("logout clicked")
    localStorage.removeItem("authUser")
    localStorage.removeItem("userRole")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("tokenId")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("name")
    localStorage.removeItem("username")

    console.log("loging out")
    window.open(GET_LOGOUT, "_blank")
    window.location.reload()
    // window.location.href = GET_LOGOUT

    //     history("/login")
    // dispatch(logoutUser())
  }

  useEffect(() => {
    if (localStorage.getItem("name")) {
      const name = localStorage.getItem("name")
      setusername(name)
    } else {
      setusername("User")
    }
  }, [localStorage.getItem("name")])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          {/* <span
            className="rounded-circle"
            style={{
              backgroundColor: "#003768",
              padding: "15px",
              textAlign: "center",
              color: "white",
              fontStyle: "bold",
              width: 40,
              height: 40,
            }}
          >
            {username && (
              <span
                className="rounded-circle header-profile-user"
                style={{ backgroundColor: "#003768", width: 40, height: 40 }}
              >
                {username
                  .replace(/^_+/, "") // Remove leading underscores
                  .split(" ")
                  .map(word => word.charAt(0))
                  .join("")}
              </span>
            )} 
                </span>*/}

          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Button onClick={logoutFunc} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Button>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
