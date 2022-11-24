import { useEffect,useState } from "react";
import http from "../../services/http";

export default function SystemErrorModal(){
    const [errors,setErrors] = useState(null);
    useEffect(
        ()=>{
            http.setApiErrorHandler(setErrors);
        },[]
    );
    if (errors) {
        const { message } =  errors.response.data;
        //Yhis is the stack in object mode const { TalisErrorStack } = errors.response.data.payload;

        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <h4 className="alert-heading">
                    API errors have been intercepted!
                </h4>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>setErrors(null)}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <hr />
                <h5><pre>{message}</pre></h5>
            </div>
        );
    }
    return null;
}
