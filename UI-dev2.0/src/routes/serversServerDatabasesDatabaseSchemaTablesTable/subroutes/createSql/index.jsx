import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import useCurrents from "../../../../services/useCurrents";
import { findConnectionNameByServerAndDb } from '../../../../store/dbTreeSlice';
import { Jumbotron,OperationCard } from "../../../../components/atoms";
import { ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,URL_PARAMS__DATABASE_NAME } from '../../../../services/CONSTANTS';
import http from '../../../../services/http';

export default function TableCreateSql(){
    const [sqlCreateStatement,setSqlCreateStatement] = useState('');
    const {server,database,schema,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByServerAndDb(server,database));

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
            <OperationCard title="SQL CREATE STATEMENTS" copyText={sqlCreateStatement}>
            <pre>{sqlCreateStatement}</pre>
            </OperationCard>
        </Jumbotron>
    );
}
