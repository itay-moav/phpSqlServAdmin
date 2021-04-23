import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useRouteMatch} from "react-router-dom";
import {UIActions} from "../../../store/ui";
import {appInitDatabase} from "../../../store/api";
import QueryEditor from "../../query/queryEditor";
import LastQuery from "../../query/lastQuery";
import QueryResults from "../../query/queryResults";

const ShowDatabase = () => {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const {selectedServer,selectedDb} = match.params;

    useEffect( () => {
        dispatch(appInitDatabase(selectedServer,selectedDb));
	},[dispatch,selectedServer,selectedDb] );

    useEffect( () => {
        dispatch(UIActions.resetTableUI());
    },[dispatch,selectedDb] );
    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
 
export default ShowDatabase;

