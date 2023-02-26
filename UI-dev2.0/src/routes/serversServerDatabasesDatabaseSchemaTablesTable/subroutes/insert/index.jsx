import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button, Table} from "react-bootstrap";
import { useForm } from "react-hook-form";
import useConnectionCurrents from "../../../../services/useConnectionCurrents";
import { tableStructure } from "../../../../store/dbTreeSlice";
import { Jumbotron } from "../../../../components/atoms";
import { QueryActions } from "../../../../store/querySlice";
import {LastQuery,QueryResults} from "../../../../components/query";
import {validationSchemaCreator,ColumnInput} from "./columnUtils";
import handleInsert from "./handleInsert";

const errors={};

export default function TableInsert(){
    const dispatch = useDispatch();
    const {server,database,schema,table,connectionName} = useConnectionCurrents();
    const structure = useSelector(tableStructure(server,database,schema,table));    
    const validationSchema={};//Since this is passed by ref, it is being built in
                              //the loop inside the renderer.
                              //I get strange errors if I try to do it 
                              //here. Probably due to hook rules.
    const { register, handleSubmit, reset } = useForm();

    useEffect(
        ()=>{
            dispatch(QueryActions.reset());
        },[]
    );

    const onSubmit = handleInsert(dispatch,connectionName,database,schema,table);
    return (
        <>
        <Jumbotron>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr key="2">
                        <th>Field Name</th>
                        <th>Type</th>
                        <th>Keys</th>
                        <th>Null?</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {structure.columns.map(tr=>{
                        validationSchema[tr.column_name] = validationSchemaCreator(tr);
                        return (
                            <tr key={tr.column_name}>
                                <td>{tr.column_name}</td>
                                <td>{tr.data_type}</td>
                                <td>{tr.is_primary_key === "1" ? "PK":""}</td>
                                {ColumnInput(tr,register,errors)}
                            </tr>
                            )})}
                </tbody>
            </Table>
            <div className="text-right">
                <Button variant="link" onClick={()=>reset()}>clear</Button>
                <Button variant="primary" type="submit" className="mt-1" tabIndex="0">INSERT</Button>
            </div>
        </form>
        </Jumbotron>

        <LastQuery />
        <QueryResults noResults="hide" />
        </>
    );
}
