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

const Login = props => {
  const [passwordShow, setPasswordShow] = useState(false)
  //meta title
  document.title = "Login | SA IT ervices"

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      role: "",
      email: "admin@themesbrand.com" || "",
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

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

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
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
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
                    <div className="my-auto">
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
                              invalid={
                                validation.touched.role &&
                                validation.errors.role
                                  ? true
                                  : false
                              }
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
                            >
                              Log In
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign in with</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <FacebookLogin
                                  appId={facebook.APP_ID}
                                  autoLoad={false}
                                  callback={facebookResponse}
                                  render={renderProps => (
                                    <Link
                                      to="#"
                                      className="social-list-item bg-primary text-white border-primary"
                                      onClick={renderProps.onClick}
                                    >
                                      <i className="mdi mdi-facebook" />
                                    </Link>
                                  )}
                                />
                              </li>
                              {/*<li className="list-inline-item">*/}
                              {/*  <TwitterLogin*/}
                              {/*    loginUrl={*/}
                              {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
                              {/*    }*/}
                              {/*    onSuccess={this.twitterResponse}*/}
                              {/*    onFailure={this.onFailure}*/}
                              {/*    requestTokenUrl={*/}
                              {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
                              {/*    }*/}
                              {/*    showIcon={false}*/}
                              {/*    tag={"div"}*/}
                              {/*  >*/}
                              {/*    <a*/}
                              {/*      href=""*/}
                              {/*      className="social-list-item bg-info text-white border-info"*/}
                              {/*    >*/}
                              {/*      <i className="mdi mdi-twitter"/>*/}
                              {/*    </a>*/}
                              {/*  </TwitterLogin>*/}
                              {/*</li>*/}
                              <li className="list-inline-item">
                                <GoogleLogin
                                  clientId={google.CLIENT_ID}
                                  render={renderProps => (
                                    <Link
                                      to="#"
                                      className="social-list-item bg-danger text-white border-danger"
                                      onClick={renderProps.onClick}
                                    >
                                      <i className="mdi mdi-google" />
                                    </Link>
                                  )}
                                  onSuccess={googleResponse}
                                  onFailure={() => {}}
                                />
                              </li>
                            </ul>
                          </div>

                          {/* <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              Forgot your password?
                            </Link>
                          </div> */}
                          <div className="mt-5 text-center">
                            <p>
                              Don&#39;t have an account ?{" "}
                              <Link
                                to="/register"
                                className="fw-medium text-primary"
                              >
                                {" "}
                                Signup now{" "}
                              </Link>{" "}
                            </p>
                            <p>
                              © {new Date().getFullYear()} SA IT Services.
                              Crafted with{" "}
                              <i className="mdi mdi-heart text-danger" /> by
                              Tekrowe Digital
                            </p>
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
