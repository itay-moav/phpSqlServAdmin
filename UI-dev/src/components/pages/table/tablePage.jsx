import React from 'react';
import {useDispatch} from 'react-redux';
import { useRouteMatch } from "react-router-dom";


import {UIActions} from "../../../store/ui";
import QueryEditor from "../../query/queryEditor";
import LastQuery from "../../query/lastQuery";
import QueryResults from "../../query/queryResults";

const TablePage = () => {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const {selectedTable} = match.params;
    dispatch(UIActions.selectedTable(selectedTable));

    return ( 
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
     );
}
 
export default TablePage;