import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button, ButtonToolbar, Col } from "react-bootstrap";
import { findConnectionNameByDbOrServer } from "../../store/dbTreeSlice";
import { getSilentQueryResults, runQuerySilent } from "../../store/querySlice";
import useCurrents from "../../services/useCurrents";

/**
 * Responsible on the box, right to the query editor, 
 * with table name and fields names.
 * Pressing on them will populate them into the query editor.
 * Saving the user the need to type field/table names or remember them
 * 
 * @param {*} param0 
 * @returns 
 */
export default function FieldsHelper({textArea}){

    const dispatch = useDispatch();
    const {server,database,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    const fieldList = useSelector(getSilentQueryResults());
    const [schema,currentTable] = table.split('.');

    const [addPrefixes,setAddPrefixes] = useState({
        db:  -1,
        tbl: -1,
        sch: -1
    });

    const togglePrefix = prefix =>{
        const prefixs = {...addPrefixes};
        prefixs[prefix] *= -1;

        switch(prefix){
            case 'tbl':
                if(prefixs.tbl === -1){
                    prefixs.sch = -1;
                    prefixs.db = -1;
                }
                break;
            case 'db':
                if(prefixs.db === 1){
                    prefixs.tbl = 1;
                    prefixs.sch = 1;
                }
                break;
            case 'sch':
                if(prefixs.sch === -1){
                    prefixs.db = -1;
                } else {
                    prefixs.tbl = 1;
                }
                break;
        }
        setAddPrefixes(prefixs);
    }

    const getPrefixs = (isTable) => {
        let pref = '';
        if(addPrefixes.db === 1){
            pref += database +'.';
        }

        if(addPrefixes.sch === 1){
            pref += schema +'.';
        }

        if(addPrefixes.tbl === 1 && isTable !== "[[table]]"){
            pref += currentTable +'.';
        }
        return pref;
    }

    const variant = prefix => {
        return addPrefixes[prefix] === 1 ? 'success' : 'secondary';
    }

    const insertField = columnName => {
        //window.alert(getPrefixs() + field.COLUMN_NAME)
        const forReal = (columnName === "[[table]]") ? currentTable : columnName;
        const insertText = getPrefixs(columnName) + forReal;
        const idx = textArea.current.selectionStart;
        textArea.current.value= textArea.current.value.substring(0,idx) + " " + insertText + textArea.current.value.substring(idx);
        textArea.current.selectionStart = idx + insertText.length+1;
        textArea.current.selectionEnd =  idx + insertText.length+1;
    }

    useEffect(
        ()=>{
            const query = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='${schema}' AND TABLE_NAME='${currentTable}'`; 
            dispatch(runQuerySilent({connectionName,server,database,query}));

        },[table]
    );

    return (
        <Col lg="2">
            <ButtonToolbar className="mb-1">
                <Button variant={variant('db')} className="mr-1" onClick={()=>togglePrefix('db')}>db.</Button>
                <Button variant={variant('sch')} className="mr-1" onClick={()=>togglePrefix('sch')}>sch.</Button>
                <Button variant={variant('tbl')} onClick={()=>togglePrefix('tbl')}>tbl.</Button>
            </ButtonToolbar>
            <div className="list-group">
                <Button
                          variant="light"
                          className="list-group-item list-group-item-action"
                          onClick={()=>insertField("[[table]]")}
                          style={{paddingTop:0,paddingBottom:0}}>

                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                        &nbsp;
                        &nbsp;
                        {currentTable}</Button>

                <hr />
            {fieldList && (fieldList.map(field=>{
                return (
                    <Button key={field.COLUMN_NAME}
                          variant="light"
                          className="list-group-item list-group-item-action"
                          onClick={()=>insertField(field.COLUMN_NAME)}
                          style={{paddingTop:0,paddingBottom:0}}>

                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                        &nbsp;
                        &nbsp;
                        {field.COLUMN_NAME}</Button>
                );
            }))}
            </div>
        </Col> 
    );
}


