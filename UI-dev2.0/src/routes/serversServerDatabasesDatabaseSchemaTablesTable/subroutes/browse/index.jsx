import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useConnectionCurrents from "../../../../services/useConnectionCurrents";
import { runQuery } from "../../../../store/querySlice";
import {LastQuery,QueryEditor,QueryResults} from "../../../../components/query";
import FieldsHelper from "../../fieldsHelper";

export default function TableBrowse(){
    const dispatch = useDispatch();
    const {server,database,schema,table,connectionName} = useConnectionCurrents();

    useEffect(
        ()=>{
            dispatch(runQuery({connectionName,server,database,query: `SELECT * FROM ${schema}.${table}`}));
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
