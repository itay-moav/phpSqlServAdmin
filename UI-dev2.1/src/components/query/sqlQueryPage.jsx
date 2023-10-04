import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LastQuery from "./lastQuery";
import QueryEditor from "./queryEditor";
import QueryResults from "./queryResults";
import { QueryActions } from "../../store/querySlice";

export default function SqlQueryPage(){
    const dispatch=useDispatch();
    useEffect(
        ()=>{
            dispatch(QueryActions.reset());
        // eslint-disable-next-line
        },[]
    );
    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}