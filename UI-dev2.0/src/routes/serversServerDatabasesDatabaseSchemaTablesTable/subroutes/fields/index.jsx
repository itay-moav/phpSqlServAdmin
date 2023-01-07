import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../../../services/useCurrents";
import { findConnectionNameByServerAndDb } from '../../../../store/dbTreeSlice';
import { runQuery } from "../../../../store/querySlice";
import {LastQuery,QueryEditor} from "../../../../components/query";
import FormatedFieldsQueryResults from "./formatedFieldsQueryResults";
import { useNavigate } from "react-router-dom";
import FieldsHelper from "../../fieldsHelper";
export default function TableFields(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {server,database,schema,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByServerAndDb(server,database));
    const query = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='${schema}' AND TABLE_NAME='${table}'`; 
    useEffect(
        ()=>{
            dispatch(runQuery({connectionName,server,database,query}));
        },[schema,table]
    );
    
    const rightCP = (textArea) => <FieldsHelper textArea={textArea} />;

    return (
        <>
            <QueryEditor runTriggers={()=>navigate('./../sql')} rightCP={rightCP} />
            <LastQuery />
            <FormatedFieldsQueryResults />
        </>
    );
}


//TODO still enable the full/raw view of the query above
