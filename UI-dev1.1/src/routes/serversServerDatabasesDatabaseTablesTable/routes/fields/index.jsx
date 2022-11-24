import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../../../services/useCurrents";
import { findConnectionNameByDbOrServer } from '../../../../store/dbTreeSlice';
import { runQuery } from "../../../../store/querySlice";
import {LastQuery,QueryEditor,QueryResults} from "../../../../components/query";

export default function TableFields(){
    const dispatch = useDispatch();
    const {server,database,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    const [schema,currentTable] = table.split('.');
    const query = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='${schema}' AND TABLE_NAME='${currentTable}'`; 
    useEffect(
        ()=>{
            dispatch(runQuery({connectionName,server,database,query}));
        },[table]
    );

    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
