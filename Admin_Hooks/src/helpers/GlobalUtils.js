import encodeUrl from "encodeurl"
import axios from "axios"
const toRegexRange = require("to-regex-range")

const getRequestData = async (
  url,
  responseIsNotJson,
  isNotAuthorized = false
) => {
  let headers = {
    langKey: localStorage.getItem("lang"),
    "Content-Type": "application/json",
  }

  if (!isNotAuthorized) {
    headers.Authorization = getToken()
  }
  const options = {
    method: "GET",
    headers,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response
      throw error
    }
    const data = responseIsNotJson ? response : await response.json()
    return data
  } catch (error) {
    throw !responseIsNotJson ? error.message : await error.response.json()
  }
}
const getRequestDataAsync = async (
  url,
  responseIsNotJson,
  isNotAuthorized = false
) => {
  let headers = {
    langKey: localStorage.getItem("lang"),
    "Content-Type": "application/json",
  }

  if (!isNotAuthorized) {
    headers.Authorization = getToken()
  }
  const options = {
    method: "GET",
    headers,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response
      throw error
    }
    return null
  } catch (error) {
    throw !responseIsNotJson ? error.message : await error.response.json()
  }
}

const postRequestData = async (
  url,
  data,
  responseIsNotJson,
  getErrorInJson = false
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: getToken(),
    },
    body: data,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      if (getErrorInJson) {
        let error = await response.json()
        throw error
      }
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response

      throw error
    }

    const data = responseIsNotJson ? response : await response.json()

    return data
  } catch (error) {
    if (getErrorInJson) {
      throw error
    }
    throw error.message
  }
}

const postRequestDataWithoutToken = async (
  url,
  data,
  responseIsNotJson,
  getErrorInJson
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: data,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      if (getErrorInJson) {
        let error = await response.json()
        throw error
      }
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response

      throw error
    }

    const data = responseIsNotJson ? response : await response.json()

    return data
  } catch (error) {
    if (getErrorInJson) {
      throw error
    }
    throw error.message
  }
}

const postRegisterRequestData = async (url, data, responseIsNotJson) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response

      throw error
    }

    const data = responseIsNotJson ? response : await response.json()

    return data
  } catch (error) {
    throw error.message
  }
}

const putRequestData = async (
  url,
  data,
  isContentTypeText,
  responseIsNotJson,
  getErrorInJson
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: data && data.token ? "Bearer " + data.token : getToken(),
  }

  if (isContentTypeText) {
    headers = {
      "Content-Type": "application/text",
      Authorization: data && data.token ? "Bearer " + data.token : getToken(),
    }
  }

  if (data) {
    if (data.token) {
      delete data.token
    }

    if (typeof data !== "string") {
      data = JSON.stringify(data)
    }
  }

  const options = {
    method: "PUT",
    body: data,
    headers,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      if (getErrorInJson) {
        let error = await response.json()
        throw error
      }
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response
      throw error
    }
    const data = responseIsNotJson ? response : await response.json()
    return data
  } catch (error) {
    if (getErrorInJson) {
      throw error
    }
    const errTest = await error.response.json()
    if (errTest.status === 43001) {
      let myErr = new Error(
        "Error " + errTest.status + ": Phone number already exists!"
      )
      throw myErr.message
    } else {
      throw error.message
    }
  }
}

const deleteRequest = async url => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      )
      error.response = response
      throw error
    }
    return response
  } catch (error) {
    throw error.message
  }
}

const getRangeRegex = (min, max) => {
  return new RegExp("^" + toRegexRange(min, max) + "$")
}

const getQueryParams = params => {
  let query = Object.keys(params)
    .map(k => encodeUrl(k) + "=" + encodeUrl(params[k]).replace("%20", " "))
    .join("&")
  return query
}

const getToken = () => {
  return "Bearer " + localStorage.getItem("authenticationToken")
}

export {
  getRequestData,
  postRequestData,
  postRegisterRequestData,
  postRequestDataWithoutToken,
  putRequestData,
  deleteRequest,
  getRangeRegex,
  getQueryParams,
  getRequestDataAsync,
}
