import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "http://localhost:8080/";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  console.log(url)
  axios.get('http://localhost:8080/jobs')
  .then((response) => response.data)
    // console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
  // });
  // return await axiosApi
  //   .get(url, { ...config })
  //   .then((response) => console.log("data:",(response.data)));
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
