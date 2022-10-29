import useCurrents from "../../services/useCurrents";
import useServerDatabaseTableList from "./useServerDatabaseTableList";
import QueryEditor from "../../components/query/queryEditor";
import LastQuery from "../../components/query/lastQuery";
import QueryResults from "../../components/query/queryResults";


export default function ServersServerDatabasesDatabaseTables(){
    const {server,database} = useCurrents();
    const databaseList  = useServerDatabaseTableList(server,database);

    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
