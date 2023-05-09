import React, { useState } from "react"
// import { post } from "../../Helper/ApiHelper"

import axios from "axios"
// import accessToken from "./jwt-token-access/accessToken"
// import accessToken from "helpers/jwt-token-access/accessToken"

// //pass new generated access token here
// const token = accessToken
import { Grid, Header, Image, Message, Icon } from "semantic-ui-react"
import { useMsal } from "@azure/msal-react"
import { Link, useNavigate } from "react-router-dom"
//apply base url for axios
const API_URL = "http://localhost:3000/"

const axiosApi = axios.create({
  baseURL: API_URL,
})
async function post(url, config = {}) {
  // url = "auth/signin"
  console.log("url:", url)
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}
const Login = () => {
  const { instance } = useMsal()
  const [errorMsg, setErrorMsg] = useState("")
  const history = useNavigate()

  async function handleLogin() {
    // let url = "auth/signin"
    // const response = await post(url)
    // console.log("response:", response)

    // const response = await fetch(`${endpoint}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   //   body: JSON.stringify(response),
    // })
    // console.log("ressponse:", response)
    // const API_URL = "http://localhost:3000/"

    // const axiosApi = axios.create({
    //   baseURL: API_URL,
    // })
    // axiosApi.defaults.headers.common["Authorization"] = token

    // axiosApi.interceptors.response.use(
    //   response => response,
    //   error => Promise.reject(error)
    // )

    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["user.read"],
      })
      console.log("loginResponse:", loginResponse)

      const postBody = {
        code: loginResponse.accessToken,
      }
      console.log("postBody:", postBody)

      // const apiResponse = await post("auth/redirect", postBody)
      const apiResponse = await axiosApi
        .post("auth/redirect", { ...postBody })
        .then(response => response.data)

      console.log("response:", apiResponse)

      if (apiResponse.status === "success") {
        history("/dashboard")
      } else {
        setErrorMsg(apiResponse.message)
      }
    } catch (err) {
      console.error(err)
      setErrorMsg("An error occurred during login. Please try again.")
    }
  }
  return (
    <>
      <Grid className="full-height" verticalAlign="middle" centered>
        <Link
          to="#"
          className="social-list-item bg-danger text-white border-danger"
          onClick={handleLogin}
        >
          <i className="mdi mdi-microsoft" />
        </Link>
        {errorMsg && (
          <Message negative>
            <Icon name="warning" />
            {errorMsg}
          </Message>
        )}
        {/* </Grid.Column> */}
      </Grid>
    </>
  )
}

export default Login
