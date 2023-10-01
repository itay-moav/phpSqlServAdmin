import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button, Table} from "react-bootstrap";
import { useForm } from "react-hook-form";
import useConnectionCurrents from "../../../../services/useConnectionCurrents";
import { tableStructure } from "../../../../store/dbTreeSlice";
import { Jumbotron } from "../../../../components/atoms";
import { QueryActions } from "../../../../store/querySlice";
import {LastQuery,QueryResults} from "../../../../components/query";
import handleSearch from "./handleSearch";

export default function TableSearch(){
    const dispatch = useDispatch();
    const {server,database,schema,table,connectionName} = useConnectionCurrents();
    const structure = useSelector(tableStructure(server,database,schema,table));
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = handleSearch(dispatch,connectionName,server,database,schema,table);

    useEffect(
        ()=>{
            dispatch(QueryActions.reset());
        },[]
    );

    return (
        <>
        <Jumbotron>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-secondary">
                Examples:<br />To use operator NOT IN (v,v,...) enter values like this: <code>v1,v2,v3</code>.
                If those values are strings, enter them like this: <code>'v1','v2','v3'</code>
            </div>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr key="2">
                        <th>Field Name</th>
                        <th>Type</th>
                        <th>Constraints</th>
                        <th>Operator</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {structure.columns.map(tr=>{return (
                    <tr key={tr.column_name}>
                        <td>{tr.column_name}</td>
                        <td>{tr.data_type}</td>
                        <td>{tr.is_primary_key === "1" ? "PK ,":""} {tr.is_nullable === "0"? "Not Null":""}</td>
                        <td>
                        <div className="input-group">
                        <select className="form-control" {...register(`operator-${tr.column_name}`)}>
                            <option value="eq">=</option>
                            <option value="gt">&gt;</option>
                            <option value="gteq">&gt;=</option>
                            <option value="lt">&lt;</option>
                            <option value="lteq">&lt;=</option>
                            <option value="noteq">!=</option>
                            <option value="LIKE">LIKE</option>
                            <option value="NOTLIKE">NOT LIKE</option>
                            <option value="LIKEpp">LIKE %...%</option>
                            <option value="NOTLIKEpp">NOT LIKE %...%</option>
                            <option value="IN">IN (v,v,...)</option>
                            <option value="NOTIN">NOT IN (v,v,...)</option>
                            <option value="BETWEEN">BETWEEN v,v</option>
                            <option value="NOTBETWEEN">NOT BETWEEN v,v</option>
                            <option value="ISNULL">IS NULL</option>
                            <option value="ISNOTNULL">IS NOT NULL</option>
                        </select>
                        </div>
                        </td>
                        <td><div className="input-group">
                            <input className="form-control" type="text" {...register(`value-${tr.column_name}`)} />
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
