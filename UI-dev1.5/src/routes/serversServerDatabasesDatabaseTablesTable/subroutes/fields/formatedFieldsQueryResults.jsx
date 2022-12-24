import {useSelector} from 'react-redux';
import { Table,Alert } from "react-bootstrap";


export default function FormatedFieldsQueryResults(){
    //TODO create as a selector function in the proper place
    const results = useSelector(state => (state.query.lastResults) );
    const errorMessage  = useSelector(state => (state.query.lastError) );
    
    if(errorMessage.length > 3){
        return (
                <Alert variant="danger">
                    <Alert.Heading>SQL Server error!</Alert.Heading>
                    <pre>{errorMessage}</pre>
                </Alert>
            );
    }
    if(results.length === 0)  return null;

    const keys = Object.keys(results[0]);
    let i = 0;

    return (
        <Table striped bordered hover size="sm" variant="dark">
            <thead>
                <tr key="1"><th colSpan="4">Fields for table {`${results[0].TABLE_SCHEMA}.${results[0].TABLE_NAME}`}</th></tr>
                <tr key="2">
                    <th>Field Name</th>
                    <th>Type</th>
                    <th>Nullable?</th>
                    <th>Collation</th>
                </tr>
            </thead>
            <tbody>
                {results.map(tr=>{return (
                <tr key={tr.COLUMN_NAME}>
                    <td>{tr.COLUMN_NAME}</td>
                    <td>{tr.DATA_TYPE}({tr.CHARACTER_MAXIMUM_LENGTH})</td>
                    <td>{tr.IS_NULLABLE}</td>
                    <td>{tr.COLLATION_NAME}</td>
                </tr>
                )})}
            </tbody>
        </Table>
    );
}
