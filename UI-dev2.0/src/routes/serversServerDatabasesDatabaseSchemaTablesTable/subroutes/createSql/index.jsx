import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import useCurrents from "../../../../services/useCurrents";
import { findConnectionNameByDbOrServer } from '../../../../store/dbTreeSlice';
import { Jumbotron } from "../../../../components/atoms";
import { ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,URL_PARAMS__DATABASE_NAME } from '../../../../services/CONSTANTS';
import http from '../../../../services/http';

export default function TableCreateSql(){
    const [sqlCreateStatement,setSqlCreateStatement] = useState('');
    const {server,database,schema,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));

    useEffect(
        ()=>{
            http.get(`/tables/definition/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}/${URL_PARAMS__DATABASE_NAME}/${database}/table/${schema}.${table}`)
                    .then(response=>{
                        setSqlCreateStatement(response.data.payload.createSql);
                    });
        },
        [table]
    );

    return (
        <Jumbotron>
            <h3>SQL CREATE STATMENT</h3>
            <pre>{sqlCreateStatement}</pre>
        </Jumbotron>
    );
}
