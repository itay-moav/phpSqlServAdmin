import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {LastQuery,QueryEditor,QueryResults} from "../../../../../../components/query";
import { QueryActions } from "../../../../../../store/querySlice";
import FieldsHelper from "../../../../../../components/dbTableHelpers/fieldsHelper";
export default function TableSql(){
    const dispatch=useDispatch();
    useEffect(
        ()=>{
            dispatch(QueryActions.reset());
        },[]
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
