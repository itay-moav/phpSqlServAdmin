import { useEffect,useState } from 'react';
import useConnectionCurrents from '../../../../../../services/useConnectionCurrents';
import { Jumbotron,OperationCard } from "../../../../../../components/atoms";
import { ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,URL_PARAMS__DATABASE_NAME } from '../../../../../../services/CONSTANTS';
import http from '../../../../../../services/http';

export default function TableCreateSql(){
    const [sqlCreateStatement,setSqlCreateStatement] = useState('');
    const {database,schema,table,connectionName} = useConnectionCurrents();

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
