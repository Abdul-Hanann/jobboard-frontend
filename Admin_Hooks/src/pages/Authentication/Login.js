import PropTypes from "prop-types"
import React from "react"
import { useState, useEffect } from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Button,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import CarouselPage from "./CarouselPage"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import saitlogo from "assets/images/sait-logo.png"

//Import config
import { facebook, google } from "../../config"
import LandingPage from "./LandingPage"

import axios from "axios"
import accessToken from "helpers/jwt-token-access/accessToken"
// import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

const Login = props => {
  const [passwordShow, setPasswordShow] = useState(false)
  //meta title
  document.title = "Login | SA IT ervices"

  const dispatch = useDispatch()

  //apply base url for axios
  const API_URL = "http://localhost:3000/"

  const axiosApi = axios.create({
    baseURL: API_URL,
  })

  axiosApi.defaults.headers.common["Authorization"] = token

  axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )
  async function callApi(url, config = {}) {
    // url = "auth/signin"
    return await axiosApi.get(url, { ...config }).then(response => {
      return response.data
    })
  }

  const loginFunc = async () => {
    // console.log("in func: ", loginFunc)

    let result = await callApi("auth/signin")
    console.log("/auth/signin result: ", result)
    // let result2 = await callApi(result)
    // https://login.microsoftonline.com/43c967a0-680f-4325-8525-f86a7c47c3f6/oauth2/v2.0/authorize?client_id=e9888fbd-7542-4884-aa02-66254c3b1d73&scope=openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&client-request-id=0c81542f-62eb-44fe-a42c-348fcfd9489a&response_mode=form_post&response_type=code&x-client-SKU=msal.js.node&x-client-VER=1.14.5&x-client-OS=linux&x-client-CPU=x64&client_info=1&code_challenge=MFROBaIUSNsZVCuxvQvZOR7OToLIVUFRIu_VL6Laz7E&code_challenge_method=S256&state=eyJjc3JmVG9rZW4iOiIxYzFhYzVmMS02ZjM3LTQ0MGYtYWQ1Yi1mZGM5NWQ4ODE0ZjkiLCJyZWRpcmVjdFRvIjoiLyJ9
    //
    // let url = "oauth2/v2.0/authorize?client_id=e9888fbd-7542-4884-aa02-66254c3b1d73&scope=openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fredirect&client-request-id=5bb0d00d-b5b1-4b71-8b79-e610d02783f3&response_mode=form_post&response_type=code&x-client-SKU=msal.js.node&x-client-VER=1.14.5&x-client-OS=linux&x-client-CPU=x64&client_info=1&code_challenge=gcHGI-CvGso0s-YQhVfiAUdeOlrHbSvGUwMMaZhO8PQ&code_challenge_method=S256&state=eyJjc3JmVG9rZW4iOiI2M2FiM2FjMy1mYzRkLTRjMjAtYTdiZS03NzM3ZWE0ZjM2NjIiLCJyZWRpcmVjdFRvIjoiLyJ9"
    // const response = await axiosApi.get(`http://localhost:3004/43c967a0-680f-4325-8525-f86a7c47c3f6/${url}`);
    window.location.href = result // replace with your desired URL

    // let url = "http://localhost:3004/43c967a0-680f-4325-8525-f86a7c47c3f6/oauth2/v2.0/authorize?client_id=e9888fbd-7542-4884-aa02-66254c3b1d73&scope=openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fredirect&client-request-id=5bb0d00d-b5b1-4b71-8b79-e610d02783f3&response_mode=form_post&response_type=code&x-client-SKU=msal.js.node&x-client-VER=1.14.5&x-client-OS=linux&x-client-CPU=x64&client_info=1&code_challenge=gcHGI-CvGso0s-YQhVfiAUdeOlrHbSvGUwMMaZhO8PQ&code_challenge_method=S256&state=eyJjc3JmVG9rZW4iOiI2M2FiM2FjMy1mYzRkLTRjMjAtYTdiZS03NzM3ZWE0ZjM2NjIiLCJyZWRpcmVjdFRvIjoiLyJ9"
    // let response = await callApi(url)
    //
    // console.log('/auth/redirect result: ', response);
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      role: "ROLE_ADMIN",
      email: "admin@saitservices.com" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Please Select Your Role"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      console.log("user values:", values)
      console.log(props.router.navigate)
      dispatch(loginUser(values, props.router.navigate))
    },
  })

  // const { error } = useSelector(state => ({
  //   error: state.Login.error,
  // }))

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.router.navigate, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.router.navigate, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <LandingPage />

            <Col xl={3}>
              <div
                className="auth-full-page-content"
                style={{ paddingTop: 48, paddingLeft: 48, paddingRight: 48 }}
              >
                <div className="w-100">
                  {/* <div className="d-flex flex-column h-100"> */}
                  <div className="d-flex flex-column h-100">
                    <div className="mb-0 md-5">
                      {/* <Link to="/dashboard" className="d-block auth-logo"> */}
                      <img
                        src={saitlogo}
                        alt=""
                        height="60"
                        className="logo-dark-element"
                      />
                      {/* </Link> */}
                    </div>
                    <div className="my-auto m-0" style={{ margin: 0 }}>
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Sign in to continue to SA IT Services.
                        </p>
                      </div>
                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Role</Label>
                            <Input
                              type="select"
                              name="role"
                              className="form-control"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.role || ""}
                              // invalid={
                              //   validation.touched.role &&
                              //   validation.errors.role
                              //     ? true
                              //     : false
                              // }
                            >
                              <option value="">Select role</option>
                              <option value="ROLE_ADMIN">Admin</option>
                              <option value="ROLE_JOB_CREATOR">
                                Job Creator
                              </option>
                              <option value="ROLE_TECHNICIAN">
                                Technician
                              </option>
                              <option value="ROLE_SCHEDULER">Scheduler</option>
                            </Input>
                            {validation.touched.role &&
                            validation.errors.role ? (
                              <FormFeedback type="invalid">
                                {validation.errors.role}
                              </FormFeedback>
                            ) : null}
                          </div>

                          {/* </FormGroup> */}
                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <div className="float-end">
                              <Link
                                to="/auth-recoverpw-2"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1" />
                                Forgot password?
                              </Link>
                            </div>
                            <div className="input-group auth-pass-inputgroup">
                              <Input
                                name="password"
                                value={validation.values.password || ""}
                                type={passwordShow ? "text" : "password"}
                                placeholder="Enter Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              <button
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="btn btn-light "
                                type="button"
                                id="password-addon"
                              >
                                <i className="mdi mdi-eye-outline"></i>
                              </button>
                            </div>
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              // onClick={loginFunc}
                            >
                              Log In
                            </button>
                          </div>

                          {/* <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              Forgot your password?
                            </Link>
                          </div> */}
                          <div className="mt-5 text-center">
                            <p>© {new Date().getFullYear()} SA IT Services.</p>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
