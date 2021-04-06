import http from "../../services/http";
import log from "../../services/log";
import * as actions from "../api";

//taken from Mosh Redux course.
const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url,method, onStart, onSuccess, onError } = action.payload;
  const body = action.payload.body || [];

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const {data} = await http.request({method,url,data:body});
    log.debug('RECEIVED FROM SERVER',data);

    // General
    dispatch(actions.apiCallSuccess(data));
    // Specific
    if (onSuccess) {
      log.debug('ONSUCC',onSuccess,typeof onSuccess);
      if(typeof onSuccess === 'object'){
        for(let i=0;i<onSuccess.length;i++){
          log.debug('ABOUT TO DISPATHC array ',i,onSuccess[i],data);
          dispatch({ type: onSuccess[i], payload: data.payload });  
        }
      } else {
        log.debug('ABOUT TO DISPATHC string',onSuccess);
        dispatch({ type: onSuccess, payload: data.payload });
      }
    }
  } catch (error) {
    log.debug('ERROR',error);
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;