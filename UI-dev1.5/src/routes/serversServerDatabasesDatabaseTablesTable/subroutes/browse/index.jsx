import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../../../services/useCurrents";
import { findConnectionNameByDbOrServer } from '../../../../store/dbTreeSlice';
import { runQuery } from "../../../../store/querySlice";
import {LastQuery,QueryEditor,QueryResults} from "../../../../components/query";
import FieldsHelper from "../../fieldsHelper";

export default function TableBrowse(){
    const dispatch = useDispatch();
    const {server,database,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    useEffect(
        ()=>{
            dispatch(runQuery({connectionName,server,database,query: `SELECT * FROM ${table}`}));
        },[table]
    );
    
    const rightCP = (textArea) => <FieldsHelper textArea={textArea} />;
    
    return (
        <>
            <QueryEditor rightCP={rightCP}/>
            <LastQuery />
            <QueryResults />
        </>
    );
}
