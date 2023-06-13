import axios from "axios"
import { del, get, post, put, getDep } from "./api_helper"
import * as url from "./url_helper"
import queryString from "query-string"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const getSocialLogin = () => get(url.SOCIAL_LOGIN)

// postSocialLogin
export const getLogout = () => get(url.GET_LOGOUT, history)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const getselectedmails = selectedmails =>
  post(url.GET_SELECTED_MAILS, selectedmails)

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) =>
  post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab })

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get crypto product
export const getCryptoProduct = () => get(url.GET_CRYPTO_PRODUCTS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// export const getJobList = () => get(url.JOB_LIST_URL)

// export const getJobList = (jobName, numberOfDays, jobWbs, site, jobDate) => {
//   const queryParams = queryString.stringify({
//     jobName,
//     numberOfDays,
//     jobWbs,
//     site,
//     jobDate,
//   })
//   const urlWithQueryParams = `${url.JOB_LIST_URL}?${queryParams}`
//   return get(urlWithQueryParams)
// }

// export const getJobList = (jobName, numberOfDays, jobWbs, site, jobDate) =>
//   get(
//     `${url.JOB_LIST_URL}?jobName=${jobName}&numberOfDays=${numberOfDays}&jobWbs=${jobWbs}&site=${site}&jobDate${jobDate}`
//   )
export const getJobList = (
  JobName,
  JobNoOfDays,
  JobWbs,
  JobSiteId,
  filteredStartDate,
  limit,
  page
) => {
  let queryParams = ""
  if (JobName) {
    queryParams += `&jobName=${JobName}`
  }
  if (JobNoOfDays) {
    queryParams += `&numberOfDays=${JobNoOfDays}`
  }
  if (JobWbs) {
    queryParams += `&jobWbs=${JobWbs}`
  }
  if (JobSiteId) {
    queryParams += `&site=${JobSiteId}`
  }
  if (filteredStartDate) {
    queryParams += `&jobDate=${filteredStartDate}`
  }
  if (limit) {
    queryParams += `&limit=${limit}`
  }
  if (page) {
    queryParams += `&page=${page}`
  }

  const urlWithParams =
    url.JOB_LIST_URL + (queryParams ? `?${queryParams.slice(1)}` : "")
  return get(urlWithParams)
}

// add jobs
export const addNewJobList = job => post(url.JOB_LIST_URL, job)
// update jobs

export const updateJobList = (id, job) => put(`${url.JOB_LIST_URL}/${id}`, job)

// delete jobs
export const deleteJobList = id => del(`${url.JOB_LIST_URL}/${id}`)
// get Apply Jobs

// get sites
export const getSites = (
  siteId,
  building,
  city,
  state,
  zipCode,
  timeZone,
  JobWbs,
  company,
  limit,
  page
) => {
  let queryParams = ""

  if (siteId) {
    queryParams += `&siteId=${siteId}`
  }
  if (building) {
    queryParams += `&building=${building}`
  }
  if (city) {
    queryParams += `&city=${city}`
  }
  if (state) {
    queryParams += `&state=${state}`
  }
  if (zipCode) {
    queryParams += `&zipcode=${zipCode}`
  }
  if (timeZone) {
    queryParams += `&timezone=${timeZone}`
  }
  if (JobWbs) {
    queryParams += `&jobWbs=${JobWbs}`
  }
  if (company) {
    queryParams += `&company=${company}`
  }
  if (limit) {
    queryParams += `&limit=${limit}`
  }
  if (page) {
    queryParams += `&page=${page}`
  }

  const urlWithParams =
    url.SITES_URL + (queryParams ? `?${queryParams.slice(1)}` : "")
  return get(urlWithParams)
}

export const getSitesFilter = data => get(`${url.SITES_URL}?select=${data}`)

// get site
export const getSite = id => get(`${url.SITES_URL}/${id}`)

let accessToken = localStorage.getItem("accessToken")
// get JobList users
export const getJobListUsers = (id, accessToken) => {
  return get(`${url.JOBLIST_USERS_URL}/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  })
}

export const getAllTechnicians = () => {
  return get(`${url.GET_AZURE_USERS}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  })
}

export const getTechnician = id => {
  return get(`${url.FIND_AZURE_USERS}/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  })
}

// add JobList user
export const addNewJobTechnician = user =>
  post(url.JOBLIST_TECHNICIAN_URL, user)

export const updateJobTechnician = (id, status) => {
  put(`${url.JOBLIST_TECHNICIAN_URL}/${id}`, status)
}

// delete JobList user
export const deleteJobTechnician = id =>
  del(`${url.JOBLIST_TECHNICIAN_URL}/${id}`)

export default () => get(url.GET_APPLY_JOB)

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

// add site
export const addNewSite = site => post(url.SITES_URL, site)

// update site
export const updateSite = (siteId, site) =>
  put(`${url.SITES_URL}/${siteId}`, site)

// delete site
export const deleteSite = siteId => del(`${url.SITES_URL}/${siteId}`)

export const getJobWbs = (JobWbs, limit, page) => {
  let queryParams = ""
  if (JobWbs) {
    queryParams += `&jobWbs=${JobWbs}`
  }
  if (limit) {
    queryParams += `&limit=${limit}`
  }
  if (page) {
    queryParams += `&page=${page}`
  }

  const urlWithParams =
    url.JOB_WBS_URL + (queryParams ? `?${queryParams.slice(1)}` : "")
  return get(urlWithParams)
}
export const getJobWbsById = id => get(`${url.JOB_WBS_URL}/${id}`)

// add site
export const addNewJobWbs = jobWbs => post(url.JOB_WBS_URL, jobWbs)

// update site
export const updateJobWbs = (id, jobWbs) =>
  put(`${url.JOB_WBS_URL}/${id}`, jobWbs)

// delete site
export const deleteJobWbs = id => del(`${url.JOB_WBS_URL}/${id}`)

// Delete Apply Jobs
export const deleteApplyJob = data =>
  del(url.DELETE_APPLY_JOB, { headers: { data } })

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get maillist
export const getMailsLists = filter =>
  post(url.GET_MAILS_LIST, {
    params: filter,
  })

//update mail
export const updateMail = mail => put(url.UPDATE_MAIL, mail)

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER)

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
export const getYearlyData = () => get(url.GET_YEARLY_DATA)
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)

export const walletBalanceData = month =>
  get(`${url.GET_WALLET_DATA}/${month}`, { params: { month } })

export const getStatisticData = duration =>
  get(`${url.GET_STATISTICS_DATA}/${duration}`, { params: { duration } })

export const visitorData = duration =>
  get(`${url.GET_VISITOR_DATA}/${duration}`, { params: { duration } })

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  })
}
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  })
}

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  })
}

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  })
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
}
