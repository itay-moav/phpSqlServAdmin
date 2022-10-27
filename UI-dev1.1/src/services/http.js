import axios from "axios";
import log from "./log";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    log.error('Axios response error',error);
  }

  if(error && error.response && error.response.status){//not authorized - login out
    log.fatal('Check server configuration.');
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

function setAppUrl(app_url) {
  axios.defaults.baseURL = app_url;
  log.debug("APP api url", axios.defaults.baseURL);
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAppUrl,
  setJwt
};

export default http;
