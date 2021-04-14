import React from 'react';
import Layout from '../../layout/layout';

import QueryEditor from "../../query/queryEditor";
import LastQuery from "../../query/lastQuery";
import QueryResults from "../../query/queryResults";

const TablePage = () => {
    return ( 
        <Layout>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </Layout>
     );
}
 
export default TablePage;