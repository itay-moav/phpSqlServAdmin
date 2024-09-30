import axios from "axios";
import log from "./log";

let errorHandler = error => {
  console.error('Axios response error',error);
}

axios.interceptors.response.use(null, error => {
  console.error('Axios Talis response error:',error.response);
  errorHandler(error);
  /*
  TOBEDELETED, keeping for referecne for now
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    
  }

  if(error && error.response && error.response.status){//not authorized - login out
    log.fatal('Check server configuration.');
  }*/
  return Promise.reject(error);
});

function setAppUrl(app_url) {
  axios.defaults.baseURL = app_url;
  log.debug("APP api url", axios.defaults.baseURL);
}

function setApiErrorHandler(handler){
  errorHandler=handler;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAppUrl,
  setApiErrorHandler
  //TOBEDELETED setJwt
};

export default http;
