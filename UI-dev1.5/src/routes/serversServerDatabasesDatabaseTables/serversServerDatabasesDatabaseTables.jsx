import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Table,Alert } from "react-bootstrap";
import useCurrents from "../../services/useCurrents";
import { findConnectionNameByDbOrServer,loadDatabaseTables,fetchTableList } from '../../store/dbTreeSlice';

export default function ServersServerDatabasesDatabaseTables(){
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    const dbTables = useSelector(fetchTableList(server,database));
    useEffect(
        ()=>{
            if(database){
                dispatch(loadDatabaseTables({connectionName,server,database}));
            }
        },[]
    );
    if(dbTables.length === 0){
        return (<Alert variant="warning">No tables found in database [{database}]</Alert>);
    }

    let previousSchema = '';
    return (
        <>
        <Table striped bordered hover size="sm" variant="dark">
        <tbody>
            {dbTables.map(tr=>{
                const key = `${tr.TABLE_SCHEMA}.${tr.TABLE_NAME}`;
                let schemaTR = null;
                if(tr.TABLE_SCHEMA !== previousSchema){
                    previousSchema = tr.TABLE_SCHEMA;
                    schemaTR = (<tr><td colSpan="6"><b>{tr.TABLE_SCHEMA}</b></td></tr>)
                }
                return (
                    <>
                    {schemaTR}
                    <tr key={key}>
                        <td>{key}</td>
                        <td><NavLink to={`${key}/structure`}>[structure]</NavLink></td>
                        <td><NavLink to={`${key}/browse`}>[browse]</NavLink></td>
                        <td>[empty]</td>
                        <td>[drop]</td>
                    </tr>
                    </>
            )})}
        </tbody>
    </Table>


    </>
    );
}
