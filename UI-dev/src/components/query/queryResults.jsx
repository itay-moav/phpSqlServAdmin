import React from "react";
import {useSelector} from 'react-redux';
import { Table,Alert } from "react-bootstrap";

const QueryResults = () => {
    //TODO create as a selector function in the proper place
    const results = useSelector(state => (state.query.lastResults) );
    const errors  = useSelector(state => (state.query.lastError) );
    
    if(errors.length){
        return (
                <Alert variant="danger">
                    <Alert.Heading>SQL Server error!</Alert.Heading>
                    <pre>{errors}</pre>
                </Alert>
            );

    }

    if(!results.length) return null;

    const keys = Object.keys(results[0]);

    return (  
        <Table responsive striped bordered hover size="sm" variant="dark">
            <thead>
                <tr>
                {keys.map( key=>(<th key={key}>{key}</th>) )}
                </tr>
            </thead>
            <tbody>
                {
                    results.map(row=>{
                                    return (<tr>{keys.map(
                                        columnKey => {
                                            return (
                                                <td>{row[columnKey]}</td>
                                            )
                                        }
                                    )}</tr>);
                                }
                    )
                }
            </tbody>
        </Table>
    );
}
 
export default QueryResults;
