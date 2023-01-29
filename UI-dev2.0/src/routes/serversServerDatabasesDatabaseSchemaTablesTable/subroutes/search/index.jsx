import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button, Table} from "react-bootstrap";
import { useForm } from "react-hook-form";
import useCurrents from "../../../../services/useCurrents";
import { findConnectionNameByServerAndDb } from '../../../../store/dbTreeSlice';
import { loadTableStructure,tableStructure } from "../../../../store/dbTreeSlice";
import { Jumbotron } from "../../../../components/atoms";
import { QueryActions } from "../../../../store/querySlice";
import {LastQuery,QueryResults} from "../../../../components/query";
import useRunSearch from "./useRunSearch";

export default function TableSearch(){
    const dispatch = useDispatch();
    const {server,database,schema,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByServerAndDb(server,database));
    const structure = useSelector(tableStructure(server,database,schema,table));
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = useRunSearch(dispatch,connectionName,server,database,schema,table);

    useEffect(
        ()=>{
            dispatch(QueryActions.reset());
        },[]
    );

    if(!structure){
        dispatch(loadTableStructure({connectionName,server,database,schema,table}));
        return null;
    }

    return (
        <>
        <Jumbotron>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Table striped bordered hover size="sm" variant="dark">
            <thead>
                <tr key="2">
                    <th>Field Name</th>
                    <th>Type</th>
                    <th>Constraints</th>
                    <th>operator</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {structure.columns.map(tr=>{return (
                <tr key={tr.column_name}>
                    <td>{tr.column_name}</td>
                    <td>{tr.data_type}</td>
                    <td>{tr.is_primary_key === "1" ? "PK ,":""} {tr.is_nullable === "0"? "Not Null":""}</td>
                    <td>OPERATOR DROPDOWN</td>
                    <td><div className="input-group">
                        <input className="form-control" type="text" {...register(tr.column_name)} />
                    </div></td>
                </tr>
                )})}
            </tbody>
        </Table>
        <div className="text-right">
            <Button variant="link" onClick={()=>reset()}>clear</Button>
            <Button variant="primary" type="submit" className="mt-1" tabIndex="0">SEARCH</Button>
        </div>
        </form>
        </Jumbotron>

        <LastQuery />
        <QueryResults noResults="hide"/>
        </>
    );
}
